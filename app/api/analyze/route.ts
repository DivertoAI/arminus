import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const ALLOWED_MIME = new Set(["application/pdf", "image/png", "image/jpeg", "text/plain"]);
const MAX_BASE64_CHARS = 5_500_000; // ~4 MB file

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const base64 = body?.base64;
    const mimeType = body?.mimeType || "application/pdf";
    if (typeof base64 !== "string" || !base64) {
      return NextResponse.json({ error: "Please upload a resume to analyze." }, { status: 400 });
    }
    if (base64.length > MAX_BASE64_CHARS) {
      return NextResponse.json({ error: "Your file is too large. Please upload a file under 4 MB." }, { status: 413 });
    }
    if (!ALLOWED_MIME.has(mimeType)) {
      return NextResponse.json({ error: "Unsupported file type. Please upload a PDF." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[/api/analyze] GEMINI_API_KEY is not set");
      return NextResponse.json({ error: "The analyzer is unavailable right now. Please try again shortly." }, { status: 503 });
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
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(50_000),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[/api/analyze] Gemini status", response.status, data?.error?.message);
      return NextResponse.json({ error: "The analyzer is unavailable right now. Please try again shortly." }, { status: 502 });
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json({ error: "We couldn't analyze this file. Please try a different PDF." }, { status: 422 });
    }
    return NextResponse.json(JSON.parse(rawText));

  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json({ error: "The analyzer is unavailable right now. Please try again shortly." }, { status: 502 });
  }
}
