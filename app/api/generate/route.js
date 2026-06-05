import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function cleanJsonText(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const form = await request.json();

    const prompt = `
You are helping create a client intake summary for a small business.

Using the client answers below, return ONLY valid JSON in this exact structure:

{
  "summary": "Short client summary",
  "mainProblem": "Main problem or need",
  "priorityLevel": "High, Medium, or Low",
  "suggestedNextStep": "Clear recommended next step",
  "missingInformation": ["Question or detail still needed", "Another missing detail"],
  "recommendedAutomation": "Most suitable automation to recommend",
  "reviewNotes": ["Important note for the business owner", "Another review note"],
  "followUpEmail": "Polite follow-up email draft"
}

Rules:
- Return JSON only.
- Do not use markdown.
- Do not invent details.
- Keep language simple and professional.
- Do not ask for passwords, recovery codes, secret keys, API keys, or sensitive credentials.
- Make the output useful for a small business owner.
- AI output is only a draft and should be reviewed before sending.

Client answers:
${JSON.stringify(form, null, 2)}
`;

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    const rawText = response.output_text;
    const cleaned = cleanJsonText(rawText);

    let result;

    try {
      result = JSON.parse(cleaned);
    } catch {
      return Response.json(
        {
          error:
            "The AI response could not be converted into structured cards. Try again.",
          raw: rawText,
        },
        { status: 500 }
      );
    }

    return Response.json({ result });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error.message || "Failed to generate output." },
      { status: 500 }
    );
  }
}