import { google } from "googleapis";

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const types: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
  };
  return types[ext] ?? "application/octet-stream";
}

function encodeBase64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildMimeMessage(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachment: { filename: string; content: Buffer; mimeType: string };
}) {
  const boundary = `----=_Part_${Date.now()}`;
  const { attachment } = options;

  return [
    `From: ${options.from}`,
    `To: ${options.to}`,
    `Subject: ${options.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    options.html,
    "",
    `--${boundary}`,
    `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
    "Content-Transfer-Encoding: base64",
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    "",
    attachment.content.toString("base64"),
    `--${boundary}--`,
  ].join("\r\n");
}

function getGmailClient() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Gmail credentials not configured on server.");
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  return google.gmail({ version: "v1", auth: oauth2 });
}

export async function sendGmailWithAttachment(options: {
  subject: string;
  html: string;
  attachment: { filename: string; content: Buffer };
}) {
  const from = process.env.GMAIL_SENDER_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!from || !to) {
    throw new Error("Gmail sender or recipient email not configured on server.");
  }

  const gmail = getGmailClient();
  const raw = encodeBase64Url(
    buildMimeMessage({
      from,
      to,
      subject: options.subject,
      html: options.html,
      attachment: {
        ...options.attachment,
        mimeType: getMimeType(options.attachment.filename),
      },
    })
  );

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
