
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, SavingsTip } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSavingsTips(transactions: Transaction[], currencySymbol: string): Promise<SavingsTip[]> {
  const expenseData = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const income = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  // Get the 5 most recent transactions for context
  const recentTransactions = transactions.slice(0, 5).map(t => 
    `${t.type}: ${t.description} (${currencySymbol}${t.amount} - ${t.category})`
  ).join("; ");

  const prompt = `
    As a professional financial advisor, analyze this financial state:
    Active Currency: ${currencySymbol}
    Total Monthly Income: ${currencySymbol}${income}
    Cumulative Expenses by Category: ${JSON.stringify(expenseData)}
    
    MOST RECENT ACTIVITY: ${recentTransactions}
    
    Provide 3 specific, actionable, and personalized savings tips. 
    Crucially, if the recent activity shows a high expense or a new trend, acknowledge it and suggest how to optimize it.
    The goal is to help the user save more money this month.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Short title of the tip" },
              content: { type: Type.STRING, description: "Detailed actionable advice" },
              impact: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Expected financial impact" }
            },
            required: ["title", "content", "impact"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching AI tips:", error);
    return [{
      title: "Maintain Consistency",
      content: "You're doing great by tracking your spending. Keep it up to see long-term patterns.",
      impact: "Medium"
    }];
  }
}
