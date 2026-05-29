import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Consultation Intake",
  description:
    "Request a discreet Aegis Legal Partners consultation for corporate law, M&A, IP, criminal defense, or private wealth matters.",
  alternates: {
    canonical: "/consultation"
  },
  openGraph: {
    title: "Private Consultation Intake | Aegis Legal Partners",
    description:
      "A secure-feeling premium intake experience for high-stakes legal matters and senior attorney review.",
    url: "/consultation",
    images: [
      {
        url: "/og-aegis.svg",
        width: 1200,
        height: 630,
        alt: "Aegis Legal Partners private consultation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Consultation Intake | Aegis Legal Partners",
    description: "Begin a discreet consultation with Aegis Legal Partners.",
    images: ["/og-aegis.svg"]
  }
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
