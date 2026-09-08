import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail, sendWhatsApp } from "@/lib/notifications";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(30),
  company: z.string().max(120).optional().or(z.literal("")),
  jobType: z.string().min(2).max(120),
  location: z.string().max(160).optional().or(z.literal("")),
  timeline: z.string().max(80).optional().or(z.literal("")),
  budget: z.string().max(80).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal(""))
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const quote = await prisma.quoteRequest.create({ data });

    const [wa, email] = await Promise.allSettled([
      sendWhatsApp(quote),
      sendEmail(quote)
    ]);

    const whatsappSent = wa.status === "fulfilled" && wa.value.ok;
    const emailSent = email.status === "fulfilled" && email.value.ok;

    await prisma.quoteRequest.update({
      where: { id: quote.id },
      data: { whatsappSent, emailSent }
    });

    const fallbackNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919422837904";
    const fallbackText = encodeURIComponent(
`NEW WEBSITE QUOTE — VIA
Reference: ${quote.id}
Name: ${quote.name}
Company: ${quote.company || "Not provided"}
Email: ${quote.email}
Phone: ${quote.phone}
Work: ${quote.jobType}
Location: ${quote.location || "Not provided"}
Timeline: ${quote.timeline || "Not provided"}
Budget: ${quote.budget || "Not provided"}

Requirement:
${quote.message || "Not provided"}`
    );

    return NextResponse.json({
      ok: true,
      reference: quote.id,
      whatsappSent,
      emailSent,
      fallbackWhatsAppUrl: `https://wa.me/${fallbackNumber}?text=${fallbackText}`
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit the request. Please call or WhatsApp us directly." },
      { status: 400 }
    );
  }
}