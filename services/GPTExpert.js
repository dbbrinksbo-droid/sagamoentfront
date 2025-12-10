// services/GPTExpert.js
import { OPENAI_API_KEY } from "./config";

export async function askCoinExpert(aiData) {
  const prompt = `
Du er SagaMoent AI – en professionel møntekspert.
Analyser disse data:

• Navn: ${aiData.label_name}
• Land: ${aiData.metadata?.country ?? "ukendt"}
• År: ${aiData.metadata?.year ?? "ukendt"}
• Metal: ${aiData.metadata?.metal ?? "ukendt"}
• Stand: ${aiData.metadata?.grade ?? "ukendt"}
• Sikkerhed: ${(aiData.confidence * 100).toFixed(1)}%

Giv et kort, præcist ekspert-svar.
Ingen teknologiske forklaringer. Kun ekspertviden.
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    return data.choices?.[0]?.message?.content ?? "Ingen respons.";
  } catch (e) {
    console.log("GPTExpert error:", e);
    return "Der skete en fejl i ekspertsystemet.";
  }
}
