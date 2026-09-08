# Vidarbha Industrial Associates — Full Website

A premium industrial-service website built with Next.js, TypeScript, Framer Motion and Prisma.

## What is included

- Responsive one-page industrial website
- Animated hero and scroll-reveal sections
- Service portfolio based on the supplied VIA material
- Technical capability section
- Safety / ISO / SOP positioning
- Industry and project portfolio
- Quote-request form
- PostgreSQL persistence through Prisma
- Automatic WhatsApp Cloud API notification
- Automatic email notification through SMTP
- WhatsApp fallback link if the Cloud API is unavailable
- Mobile navigation
- SEO metadata
- No external image dependency — the hero uses CSS graphics so the site works immediately

## Source-of-truth content used

Company: Vidarbha Industrial Associates
Working since: 1997
Location: Chandrapur, Maharashtra
Representative: P.C. Mitra
Phone: +91 9422837904 / +91 9770215590
Email: vidarbha.industrial.associates@gmail.com
GST: 27AHTPM2150M1ZUGST

Services represented:
- High-pressure hydro jetting, 150–1100 bar
- Chemical cleaning
- Retubing
- Hydro / leak testing
- Eddy Current Testing
- Helium testing
- Industrial maintenance
- Radiator services
- Chemical supply
- Foam cleaning

## Setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Add a PostgreSQL connection string.
4. Add Meta WhatsApp Cloud API credentials.
5. Add SMTP credentials.
6. Install packages:

   npm install

7. Create database tables:

   npm run db:push

8. Start locally:

   npm run dev

Open http://localhost:3000.

## WhatsApp Cloud API

Create a Meta WhatsApp Business app and obtain:
- Access token
- Phone Number ID
- Recipient number

Set:
- WHATSAPP_ACCESS_TOKEN
- WHATSAPP_PHONE_NUMBER_ID
- WHATSAPP_RECIPIENT_NUMBER

Important: WhatsApp Cloud API messaging is subject to Meta's current business-initiated messaging/template rules. For production, configure the appropriate approved templates if Meta requires them for your message flow.

## Email

For Gmail SMTP, use an App Password rather than the normal Gmail account password when 2-Step Verification is enabled.

Set:
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASSWORD
- NOTIFY_EMAIL

## Deployment

The app can be deployed to a Node-compatible host. If deploying on Vercel, use a hosted PostgreSQL database and add all environment variables in the project settings.

## Replacing the visual assets

The current design intentionally uses CSS-generated industrial graphics. When the actual VIA logo, machine photos, plant photos and brochure images are provided, put them in `public/images/` and replace the relevant hero / project blocks with Next Image components.

## Important content verification

The website preserves the supplied business information. Before publishing, verify:
- exact legal company name
- ISO certification wording and certificate validity
- client/project names and permission to display them
- GST number
- phone numbers
- email
- WhatsApp API setup
- whether “100% satisfaction guarantee” should be a public commercial claim

Do not publish an ISO certification claim merely because an SOP system references ISO standards; the live certificate should be available if you want to display “ISO certified”.
