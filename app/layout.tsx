import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Revenue Bloom · Beehive & Branch",
  description: "There's money hiding in your business.",
  icons: { icon: "/beehive-mark.png" },
  openGraph: {
    title: "Revenue Bloom · Beehive & Branch",
    description: "There's money hiding in your business. Go get it.",
    images: [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-ui antialiased">{children}</body>
    </html>
  );
}
