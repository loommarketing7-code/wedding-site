import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cahaya & Kal | Luxury Wedding Invitation",
  description:
    "A cinematic editorial wedding invitation for Cahaya and Kal at Borcelle Ballroom on December 08, 2026.",
  keywords: [
    "wedding invitation",
    "luxury wedding",
    "Cahaya and Kal",
    "Borcelle Ballroom",
    "editorial wedding"
  ],
  openGraph: {
    title: "Cahaya & Kal | Save the Date",
    description:
      "Please join us to celebrate the wedding of Cahaya and Kal on December 08, 2026.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Luxury outdoor wedding venue with soft floral styling"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cahaya & Kal | Save the Date",
    description:
      "A luxury cinematic wedding invitation for December 08, 2026 at Borcelle Ballroom."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
