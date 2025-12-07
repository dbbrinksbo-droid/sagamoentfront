import { OPENAI_API_KEY } from "./config";

export async function askChatGPT(messages) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: messages,
      }),
    });

    const data = await response.json();

    // Sikkerhedstjek hvis OpenAI giver et tomt svar
    if (!data || !data.choices || !data.choices[0]) {
      return "AI kunne ikke levere et svar.";
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.log("❌ ChatGPT fejl:", error);
    return "Der skete en fejl i forbindelsen til AI.";
  }
}
