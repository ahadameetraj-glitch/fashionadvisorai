import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { occasion = '', mood = '', style = '' } = req.body || {};

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY not configured" });
  }

  const prompt = `You are a professional fashion stylist AI.
Suggest 3 outfit ideas for:
Occasion: ${occasion}
Mood: ${mood}
Preferred Style: ${style}

For each outfit:
1) List top, bottom, outerwear (if any)
2) Suggest shoes and accessories
3) Briefly explain why it works (colors, fit, occasion)`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600
    });

    const advice = completion.choices?.[0]?.message?.content || "";
    return res.status(200).json({ advice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
