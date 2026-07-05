import { NextResponse } from "next/server";
import { sendGmail } from "@/lib/gmail";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const firstName = data["First Name"] || "Not provided";
    const lastName  = data["Last Name"]  || "Not provided";
    const email     = data["Email"]      || "Not provided";
    const phone     = data["Phone"]      || "Not provided";
    const message   = data["Message"]    || "Not provided";

    const subject = `New Contact Form Submission: ${firstName} ${lastName}`;
    const html = `
      <h2 style="font-family:sans-serif;color:#0080D0;margin-bottom:8px">New Contact Inquiry</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">First Name</td><td style="padding:6px 0">${firstName}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Last Name</td><td style="padding:6px 0">${lastName}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Email</td><td style="padding:6px 0">${email}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Phone</td><td style="padding:6px 0">${phone}</td></tr>
      </table>
      <div style="font-family:sans-serif;margin-top:20px;padding:16px;background:#f4f6f8;border-radius:6px;color:#36465B">
        <strong style="display:block;margin-bottom:8px">Message:</strong>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${message}</p>
      </div>
    `;

    // Send the email via Gmail API
    await sendGmail({
      subject,
      html,
    });

    console.log("Contact form email sent successfully using Gmail API");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to send contact inquiry via Gmail API:", error);
    return NextResponse.json({ error: error.message || "Failed to send inquiry" }, { status: 500 });
  }
}
