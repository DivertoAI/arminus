import { NextResponse } from "next/server";
import { sendGmailWithAttachment } from "@/lib/gmail";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file      = formData.get("file")      as File   | null;
    const name      = (formData.get("name")     as string | null)?.trim()  || "Not provided";
    const email     = (formData.get("email")    as string | null)?.trim()  || "Not provided";
    const phone     = (formData.get("phone")    as string | null)?.trim()  || "Not provided";

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    // Convert file to buffer for email attachment
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    const subjectName = name && name !== "Not provided" ? `${name} - ` : "";
    const subject = `New Resume Submission: ${subjectName}${file.name}`;
    const html = `
      <h2 style="font-family:sans-serif;color:#0080D0;margin-bottom:8px">New Resume Submitted</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Name</td><td style="padding:6px 0">${name}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Email</td><td style="padding:6px 0">${email}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Phone</td><td style="padding:6px 0">${phone}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">File</td><td style="padding:6px 0">${file.name}</td></tr>
      </table>
      <p style="font-family:sans-serif;color:#36465B;margin-top:16px">The resume is attached to this email.</p>
    `;

    // Send the email via Gmail API using the preconfigured helper
    await sendGmailWithAttachment({
      subject,
      html,
      attachment: {
        filename: file.name,
        content: buffer,
      },
    });

    console.log("Email sent successfully using Gmail API");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to send resume via Gmail API:", error);
    return NextResponse.json({ error: error.message || "Failed to send resume" }, { status: 500 });
  }
}
