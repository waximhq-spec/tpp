import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Power Planet - Solar Energy Kashmir",
  description: "Solar energy landing page and interactive subsidy calculator for residential and commercial rooftops in Kashmir. Calculate PM Surya Ghar subsidies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
