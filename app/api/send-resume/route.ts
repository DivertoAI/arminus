import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Convert file to buffer for nodemailer
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    // Retrieve environment variables
    const gmailSenderEmail = process.env.GMAIL_SENDER_EMAIL;
    const gmailClientId    = process.env.GMAIL_CLIENT_ID;
    const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;

    const contactToEmail   = process.env.CONTACT_TO_EMAIL || "contactus@arminus.in";
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || "contactus@arminus.in";
    const contactSmtpUser  = process.env.CONTACT_SMTP_USER;
    const contactSmtpPass  = process.env.CONTACT_SMTP_PASSWORD;

    let transporter;

    // Check if OAuth2 credentials are provided and valid
    const useOAuth2 = gmailSenderEmail && gmailClientId && gmailClientSecret && gmailRefreshToken;

    if (useOAuth2) {
      console.log("Configuring Nodemailer with Gmail OAuth2");
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: gmailSenderEmail,
          clientId: gmailClientId,
          clientSecret: gmailClientSecret,
          refreshToken: gmailRefreshToken,
        },
      });
    } else if (contactSmtpUser && contactSmtpPass) {
      console.log("Configuring Nodemailer with SMTP");
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: contactSmtpUser,
          pass: contactSmtpPass,
        },
      });
    } else {
      console.warn("Neither Gmail OAuth2 nor SMTP credentials are fully configured. Falling back to local transporter check.");
      // Fallback/Local development mock transporter or error
      return NextResponse.json(
        { error: "Email configuration is incomplete. Please configure GMAIL OAuth2 or CONTACT SMTP variables." },
        { status: 500 }
      );
    }

    const senderEmail = useOAuth2 ? gmailSenderEmail : (contactFromEmail || contactSmtpUser);
    const subject = `Resume Submission: ${name} — ${file.name}`;
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

    await transporter.sendMail({
      from: `Arminus Careers <${senderEmail}>`,
      to: contactToEmail,
      subject: subject,
      html: html,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    console.log("Email sent successfully using Nodemailer");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to send resume via Gmail:", error);
    return NextResponse.json({ error: error.message || "Failed to send resume" }, { status: 500 });
  }
}
