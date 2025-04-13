//app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { FilterProvider } from "@/context/FilterContext";

export const metadata: Metadata = {
  title: "HeyFood Africa",
  description: "Discover and enjoy the best food experiences across Africa.",
  icons: {
    icon: '//vectors/logo.svg', // or '/favicon.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/vectors/logo.svg" />
      <body>
        <FilterProvider>
          {children}
        </FilterProvider>
      </body>
      </html>
  );
}
