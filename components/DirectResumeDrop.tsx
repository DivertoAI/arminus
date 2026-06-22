"use client";

import { useState, useRef } from "react";

export function DirectResumeDrop() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("submitting");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/send-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send resume");
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      alert("Failed to send resume: " + (err.message || "Unknown error"));
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
      />
      <button 
        className="btn btn-ghost" 
        onClick={() => fileInputRef.current?.click()}
        disabled={status === "submitting" || status === "success"}
      >
        {status === "submitting" ? "Sending..." : status === "success" ? "Sent ✓" : "Drop your Resume"}
      </button>
    </>
  );
}
