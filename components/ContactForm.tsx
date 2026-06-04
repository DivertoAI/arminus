"use client";
import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name}${form.company ? ` · ${form.company}` : ""}`);
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\n\n${form.message}`);
    window.location.href = `mailto:contactus@arminus.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="cf-row">
        <label><span>Your name</span><input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Ravi Kumar" /></label>
        <label><span>Company</span><input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Corp" /></label>
      </div>
      <div className="cf-row">
        <label><span>Work email</span><input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ravi@acmecorp.com" /></label>
        <label><span>Phone</span><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" /></label>
      </div>
      <label><span>How can we help?</span><textarea required rows={5} value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell us about the role, team, or challenge you're working on..." /></label>
      <button type="submit" className="btn btn-blue">
        Send message <span className="arrow">→</span>
      </button>
    </form>
  );
}
