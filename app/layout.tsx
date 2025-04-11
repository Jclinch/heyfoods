import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeyFood Africa",
  description: "Discover and enjoy the best food experiences across Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
