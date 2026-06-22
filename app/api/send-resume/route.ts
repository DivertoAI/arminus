import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await resend.emails.send({
      from: "Arminus Careers <onboarding@resend.dev>", 
      to: ["contactus@arminus.in"],
      subject: `Direct Resume Drop: ${file.name}`,
      html: `
        <h2>New Resume Dropped</h2>
        <p>A candidate clicked the "Drop your Resume" button and directly uploaded the attached file.</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Failed to send resume:", error);
    return NextResponse.json({ error: error.message || "Failed to send resume" }, { status: 500 });
  }
}
