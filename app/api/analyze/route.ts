import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64, mimeType } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const promptText = `You are an expert Applicant Tracking System (ATS) and Senior Technical Recruiter. Your task is to critically analyze the provided text extracted from a candidate's resume and evaluate it for a modern B2B tech/enterprise market.

You must analyze the resume based on four key metrics:
1. ATS Readability & Formatting (Are sections clear? Is it parseable?)
2. Action Verbs & Tone (Does it use strong, active language?)
3. Quantifiable Metrics (Are achievements backed by numbers and data?)
4. Leadership & Impact (Does the candidate demonstrate ownership?)

You must respond ONLY with a valid JSON object matching this exact structure:
{
  "overall_score": 68,
  "summary": "A brief 2-sentence summary of the resume's strengths and core weaknesses.",
  "metrics": [
    {
      "name": "Quantifiable Metrics",
      "status": "Needs Improvement",
      "feedback": "You have listed responsibilities but lack hard data. Add numbers to demonstrate scale."
    }
  ]
}
Note: the overall_score should be an integer between 0 and 100. Status should be either "Good" or "Needs Improvement".`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            { inlineData: { mimeType: mimeType || "application/pdf", data: base64 } }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || "Gemini API error";
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    const rawText = data.candidates[0].content.parts[0].text;
    const result = JSON.parse(rawText);
    return NextResponse.json(result);

  } catch (err: any) {
    console.error("[/api/analyze]", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
