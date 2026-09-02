import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MadeThis · Revenue Bloom",
  description: "There’s money hiding in your business. Go get it.",
  icons: { icon: "/madethis-close.png" },
  openGraph: {
    title: "MadeThis · Revenue Bloom",
    description: "MadeThis finds the next opportunity. You make it more.",
    images: ["/madethis-close.png"],
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
