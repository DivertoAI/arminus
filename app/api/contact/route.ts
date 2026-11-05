import { NextResponse } from "next/server";
import { sendGmail } from "@/lib/gmail";
import { escapeHtml, clean, isValidEmail, isValidPhone } from "@/lib/validate";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => null);
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const firstName = clean(data["First Name"], 80);
    const lastName  = clean(data["Last Name"], 80);
    const email     = clean(data["Email"], 254);
    const phone     = clean(data["Phone"], 40);
    const message   = String(data["Message"] ?? "").trim().slice(0, 5000);

    if (!firstName || !message) return NextResponse.json({ error: "Please fill in your name and message." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!isValidPhone(phone)) return NextResponse.json({ error: "Phone number must be at least 10 digits." }, { status: 400 });

    const subject = `New Contact Form Submission: ${(firstName + " " + lastName).replace(/[<>]/g, "").trim()}`;
    const html = `
      <h2 style="font-family:sans-serif;color:#0080D0;margin-bottom:8px">New Contact Inquiry</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">First Name</td><td style="padding:6px 0">${escapeHtml(firstName)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Last Name</td><td style="padding:6px 0">${escapeHtml(lastName) || "Not provided"}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Phone</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>
      </table>
      <div style="font-family:sans-serif;margin-top:20px;padding:16px;background:#f4f6f8;border-radius:6px;color:#36465B">
        <strong style="display:block;margin-bottom:8px">Message:</strong>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      </div>
    `;

    await sendGmail({ subject, html });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/contact] failed:", error);
    return NextResponse.json({ error: "We couldn't send your message right now. Please try again, or email contactus@arminus.in." }, { status: 502 });
  }
}
