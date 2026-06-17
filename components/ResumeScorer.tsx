"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export function ResumeScorer() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "analyzing" | "results" | "error">("idle");
  const [scoreData, setScoreData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    setStatus("analyzing");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Str = (reader.result as string).split(",")[1];
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

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
                {
                  inlineData: {
                    mimeType: file.type || "application/pdf",
                    data: base64Str
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0
          }
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to analyze");
        }

        const rawText = data.candidates[0].content.parts[0].text;
        const result = JSON.parse(rawText);
        setScoreData(result);
        setStatus("results");
      };
      
      reader.onerror = () => {
        setErrorMessage("There was an issue reading the file.");
        setStatus("error");
      };

    } catch (err: any) {
      console.error(err);
      const msg = err.message?.toLowerCase() || "";
      if (msg.includes("high demand") || msg.includes("503")) {
        setErrorMessage("Our servers are currently busy. Please try again in a few moments.");
      } else {
        setErrorMessage("There was an issue parsing your resume. Ensure it is a valid text-based PDF.");
      }
      setStatus("error");
    }
  };

  return (
    <section className="section tint" id="free-tool" style={{borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
      <div className="wrap">
        <div className="sec-head center" style={{maxWidth: "720px", margin: "0 auto 40px"}}>
          <div className="sec-eyebrow">Check Your Score</div>
          <h2 className="sec-title">AI Resume <span className="ital coral" style={{color: "var(--coral)"}}>Score</span></h2>
          <p className="sec-sub">Upload your resume to see how modern Applicant Tracking Systems parse your profile.</p>
        </div>
        
        <div style={{maxWidth: "680px", margin: "0 auto", background: "white", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", padding: "48px 40px", boxShadow: "var(--shadow-card)"}}>
          {status === "idle" && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", cursor: "pointer", padding: "32px", border: "2px dashed var(--line)", borderRadius: "var(--r-lg)", transition: "border-color .2s", textAlign: "center"}}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--blue)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--line)"}
            >
              <div style={{width: "64px", height: "64px", borderRadius: "50%", background: "var(--blue-soft)", color: "var(--blue)", display: "grid", placeItems: "center"}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div style={{fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)"}}>{file ? file.name : "Click or drag your resume here"}</div>
              <div style={{fontSize: "0.9rem", color: "var(--ink-3)"}}>Supports PDF (Max 2MB)</div>
              <input type="file" accept=".pdf" onChange={handleFileChange} ref={fileInputRef} style={{display: "none"}} />
              
              {file && (
                <button className="btn btn-blue" style={{marginTop: "8px"}} onClick={(e) => { e.stopPropagation(); analyzeResume(); }}>
                  Analyze Resume
                </button>
              )}
            </div>
          )}

          {status === "analyzing" && (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", padding: "40px 0"}}>
              <div style={{position: "relative", width: "80px", height: "100px", margin: "0 auto", overflow: "hidden", border: "2px solid var(--line)", borderRadius: "8px", background: "var(--bg-2)"}}>
                <style>{`
                  @keyframes scanLine {
                    0% { top: -10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                  }
                `}</style>
                <div style={{position: "absolute", left: "12px", top: "20px", right: "12px", height: "6px", borderRadius: "3px", background: "var(--line)"}} />
                <div style={{position: "absolute", left: "12px", top: "40px", right: "12px", height: "6px", borderRadius: "3px", background: "var(--line)"}} />
                <div style={{position: "absolute", left: "12px", top: "60px", right: "32px", height: "6px", borderRadius: "3px", background: "var(--line)"}} />
                <div style={{position: "absolute", left: "-5%", right: "-5%", height: "3px", background: "var(--blue)", boxShadow: "0 0 12px var(--blue)", animation: "scanLine 1.5s linear infinite"}} />
              </div>
              <div style={{fontSize: "1.1rem", fontWeight: "700", color: "var(--ink)"}}>Analyzing your resume...</div>
            </div>
          )}

          {status === "error" && (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", padding: "32px", border: "1px solid rgba(224,32,32,0.3)", borderRadius: "var(--r-lg)", background: "var(--coral-soft)", textAlign: "center"}}>
               <div style={{width: "48px", height: "48px", borderRadius: "50%", background: "white", color: "var(--coral)", display: "grid", placeItems: "center", boxShadow: "0 4px 12px rgba(224,32,32,0.1)"}}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </div>
               <div style={{fontSize: "1.1rem", fontWeight: "700", color: "var(--coral-deep)"}}>Analysis Failed</div>
               <div style={{fontSize: "0.95rem", color: "var(--coral-deep)", maxWidth: "400px", lineHeight: 1.5}}>{errorMessage}</div>
               <button className="btn" style={{marginTop: "8px", background: "white", color: "var(--coral)", border: "1px solid rgba(224,32,32,0.2)"}} onClick={() => setStatus("idle")}>Try Again</button>
            </div>
          )}

          {status === "results" && scoreData && (
            <div style={{display: "grid", gridTemplateColumns: "1fr", gap: "36px", alignItems: "start"}}>
              <div style={{display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "36px", alignItems: "start"}}>
                <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <div style={{position: "relative", width: "160px", height: "160px"}}>
                    <svg style={{width: "100%", height: "100%"}} viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--line)" strokeWidth="8"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke={scoreData.overall_score > 75 ? "#19B26B" : scoreData.overall_score > 60 ? "#F59E0B" : "var(--coral)"} strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * scoreData.overall_score) / 100} style={{transformOrigin: "center", transform: "rotate(-90deg)"}} />
                    </svg>
                    <div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                      <div style={{fontSize: "2rem", fontWeight: "800", color: "var(--ink)", lineHeight: 1}}>{scoreData.overall_score}<span style={{fontSize: "1rem", color: "var(--ink-3)", fontWeight: "600"}}>/100</span></div>
                    </div>
                  </div>
                </div>
                
                <div style={{flex: 1}}>
                  <div style={{fontSize: "1.2rem", fontWeight: "700", color: "var(--ink)"}}>ATS Match Score</div>
                  <p style={{fontSize: "0.95rem", lineHeight: 1.6, color: "var(--ink-2)", margin: "8px 0 20px"}}>{scoreData.summary}</p>
                  
                  <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                    {scoreData.metrics?.map((m: any, i: number) => (
                      <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: "bold", flexShrink: 0, backgroundColor: m.status.includes("Good") ? "rgba(25,178,107,0.15)" : "var(--coral-soft)", color: m.status.includes("Good") ? "#19B26B" : "var(--coral)" }}>
                          {m.status.includes("Good") ? "✓" : "!"}
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                          <strong style={{fontSize: "0.95rem", color: "var(--ink)"}}>{m.name}</strong>
                          <div style={{fontSize: "0.85rem", color: "var(--ink-2)", marginTop: "4px", lineHeight: 1.45}}>{m.feedback}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{marginTop: "32px"}}>
                    <Link href="#pricing" className="btn btn-blue" style={{textDecoration: "none"}}>
                      Improve your score with Career Labs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
