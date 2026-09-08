import nodemailer from "nodemailer";

type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  jobType: string;
  location?: string | null;
  timeline?: string | null;
  budget?: string | null;
  message?: string | null;
};

const clean = (v?: string | null) => (v || "Not provided").trim();

export async function sendWhatsApp(quote: Quote) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

  if (!token || !phoneNumberId || !recipient) {
    return { ok: false, reason: "WhatsApp Cloud API environment variables are missing." };
  }

  const text =
`NEW WEBSITE QUOTE — VIA
--------------------------------
Reference: ${quote.id}
Name: ${quote.name}
Company: ${clean(quote.company)}
Email: ${quote.email}
Phone: ${quote.phone}
Work: ${quote.jobType}
Location: ${clean(quote.location)}
Timeline: ${clean(quote.timeline)}
Budget: ${clean(quote.budget)}

Requirement:
${clean(quote.message)}

Source: Website`;

  const response = await fetch(
    `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { body: text }
      })
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`WhatsApp API error: ${response.status} ${body}`);
  }

  return { ok: true };
}

export async function sendEmail(quote: Quote) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const recipient = process.env.NOTIFY_EMAIL || user;

  if (!host || !user || !pass || !recipient) {
    return { ok: false, reason: "SMTP environment variables are missing." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: `"VIA Website" <${user}>`,
    to: recipient,
    replyTo: quote.email,
    subject: `New Quote Request — ${quote.jobType} — ${quote.name}`,
    text:
`New quote request received.

Reference: ${quote.id}
Name: ${quote.name}
Company: ${clean(quote.company)}
Email: ${quote.email}
Phone: ${quote.phone}
Work: ${quote.jobType}
Location: ${clean(quote.location)}
Timeline: ${clean(quote.timeline)}
Budget: ${clean(quote.budget)}

Requirement:
${clean(quote.message)}
`
  });

  return { ok: true };
}