import type { Metadata } from "next";
import { outfit, caslon } from "../fonts";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Bidita Gogoi | Portfolio",
  description: "B.Tech 1st Year | Passionate Developer | Tech Enthusiast",
};

import { CursorProvider } from "@/context/cursor-context";
import CustomCursor from "@/components/ui/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.className} bg-black text-white antialiased`}>
        <CursorProvider>
          <Navbar />
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
