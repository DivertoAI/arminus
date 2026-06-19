"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const data = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
      "First Name": (e.currentTarget.elements.namedItem("First Name") as HTMLInputElement).value,
      "Last Name": (e.currentTarget.elements.namedItem("Last Name") as HTMLInputElement).value,
      "Email": (e.currentTarget.elements.namedItem("Email") as HTMLInputElement).value,
      "Phone": (e.currentTarget.elements.namedItem("Phone") as HTMLInputElement).value,
      "Message": (e.currentTarget.elements.namedItem("Message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      
      if (json.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        console.error("Web3Forms error:", json);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form" style={{ textAlign: "center", padding: "64px 32px", maxWidth: "680px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "24px", color: "var(--blue)", marginBottom: "16px" }}>Message Sent! 🎉</h3>
        <p style={{ color: "var(--ink-2)" }}>Thank you for reaching out. Our team will get back to you within one business day.</p>
        <button type="button" className="btn btn-blue" style={{ marginTop: "24px", fontSize: "13px", padding: "8px 18px" }} onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" style={{ maxWidth: "680px", margin: "0 auto" }} onSubmit={handleSubmit}>
      <div className="cf-row">
        <label>
          <span>First Name *</span>
          <input type="text" name="First Name" required placeholder="John" />
        </label>
        <label>
          <span>Last Name *</span>
          <input type="text" name="Last Name" required placeholder="Doe" />
        </label>
      </div>
      <div className="cf-row">
        <label>
          <span>Email Address *</span>
          <input type="email" name="Email" required placeholder="john@company.com" />
        </label>
        <label>
          <span>Phone Number *</span>
          <input type="tel" name="Phone" required placeholder="+91 98765 43210" />
        </label>
      </div>
      <label>
        <span>Message *</span>
        <textarea name="Message" rows={5} required placeholder="Tell us about your requirements..." />
      </label>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
        <span style={{ color: "var(--coral)", fontSize: "14px", opacity: status === "error" ? 1 : 0, transition: "opacity 0.2s" }}>
          Something went wrong. Please try again.
        </span>
        <button type="submit" className="btn btn-blue" disabled={status === "submitting"} style={{ marginLeft: "auto" }}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
