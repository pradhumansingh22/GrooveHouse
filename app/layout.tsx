import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "GrooveHouse",
  description:
    "A collaborative music room platform where users can join rooms and queue songs to enjoy together in real-time.",
  openGraph: {
    title: "GrooveHouse",
    description:
      "A collaborative music room platform where users can join rooms and queue songs to enjoy together in real-time.",
    url: "https://groovehouse.vercel.app",
    siteName: "GrooveHouse",
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "GrooveHouse preview image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrooveHouse",
    description:
      "A collaborative music room platform where users can join rooms and queue songs to enjoy together in real-time.",
    images: ["/preview-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
