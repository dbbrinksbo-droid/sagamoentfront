// services/GPTExpert.js — V12 Coin Expert Engine

import { OPENAI_API_KEY } from "./config";

export async function askCoinExpert(metadata) {
  try {
    const prompt = `
Du er SagaMoent AI – en professionel møntekspert.
Brug KUN disse data fra analysen:

- Label: ${metadata.label_name}
- År: ${metadata.year}
- Land: ${metadata.country}
- Sikkerhed: ${metadata.confidence}

Giv et kort, professionelt og præcist svar.
Ingen forklaringer om GPT-teknologi.
Ingen "jeg baserer mig på dine oplysninger".
Ingen undskyldninger.
Ingen snak om vision-modeller.

Start direkte som ekspert.
`;

    const res = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await res.json();

    return data.choices?.[0]?.message?.content || "Ingen respons.";
  } catch (e) {
    return "Der opstod en fejl i ekspert-systemet.";
  }
}

