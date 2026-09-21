import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER ?? "divertoai@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendGmail(options: {
  subject: string;
  html: string;
  attachment?: { filename: string; content: Buffer };
}) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER ?? "divertoai@gmail.com",
    to: "contactus@arminus.in",
    subject: options.subject,
    html: options.html,
    attachments: options.attachment
      ? [{ filename: options.attachment.filename, content: options.attachment.content }]
      : [],
  });
}

export async function sendGmailWithAttachment(options: {
  subject: string;
  html: string;
  attachment: { filename: string; content: Buffer };
}) {
  return sendGmail(options);
}
