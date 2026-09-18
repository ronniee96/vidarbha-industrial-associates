CREATE TABLE "QuoteRequest" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "company" TEXT,
  "jobType" TEXT NOT NULL,
  "location" TEXT,
  "timeline" TEXT,
  "budget" TEXT,
  "message" TEXT,
  "source" TEXT NOT NULL DEFAULT 'website',
  "whatsappSent" BOOLEAN NOT NULL DEFAULT false,
  "emailSent" BOOLEAN NOT NULL DEFAULT false,

  CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);