import { NextResponse } from "next/server";
import { sendGmailWithAttachment } from "@/lib/gmail";
import { escapeHtml, clean, isValidEmail, isValidPhone, MAX_UPLOAD_BYTES } from "@/lib/validate";

export const maxDuration = 60;

const ALLOWED_EXT = /\.(pdf|docx?|png|jpe?g)$/i;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file  = formData.get("file") as File | null;
    const name  = clean(formData.get("name"), 120);
    const email = clean(formData.get("email"), 254);
    const phone = clean(formData.get("phone"), 40);

    if (!file || typeof file === "string" || file.size === 0) {
      return NextResponse.json({ error: "Please attach a resume file." }, { status: 400 });
    }
    if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!isValidPhone(phone)) return NextResponse.json({ error: "Phone number must be at least 10 digits." }, { status: 400 });
    if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Your file is larger than 4 MB. Please upload a smaller file." }, { status: 413 });
    if (!ALLOWED_EXT.test(file.name)) return NextResponse.json({ error: "Please upload a PDF, DOC, DOCX, PNG or JPG file." }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeFileName = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);

    const subject = `New Resume Submission: ${name.replace(/[<>]/g, "")} - ${safeFileName}`;
    const html = `
      <h2 style="font-family:sans-serif;color:#0080D0;margin-bottom:8px">New Resume Submitted</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">Phone</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#6B7A90;font-weight:600">File</td><td style="padding:6px 0">${escapeHtml(safeFileName)}</td></tr>
      </table>
      <p style="font-family:sans-serif;color:#36465B;margin-top:16px">The resume is attached to this email.</p>
    `;

    await sendGmailWithAttachment({
      subject,
      html,
      attachment: { filename: safeFileName, content: buffer },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/send-resume] failed:", error);
    return NextResponse.json({ error: "We couldn't send your resume right now. Please try again, or email it to contactus@arminus.in." }, { status: 502 });
  }
}
