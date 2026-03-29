import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, country, message } = body;

    if (!name || !email || !country || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Ekko Distribution - Nouveau Lead" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Nouveau lead : ${name} — ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1B5E20; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nouveau lead depuis le site</h1>
          </div>
          <div style="background-color: #f9f9f6; padding: 24px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1B5E20; width: 140px;">Nom</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1B5E20;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #E65100;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1B5E20;">Téléphone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${phone || "Non renseigné"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1B5E20;">Entreprise</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${company || "Non renseignée"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #1B5E20;">Pays</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${country}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background-color: white; border-radius: 8px; border-left: 4px solid #E65100;">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #1B5E20;">Message :</p>
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background-color: #1B5E20; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px; opacity: 0.7;">Ekko Distribution — Belle Vie</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
