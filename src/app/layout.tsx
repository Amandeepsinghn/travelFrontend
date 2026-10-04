import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trail Panda",
    template: "%s · Trail Panda",
  },
  description: "More destinations. Happier you.",
  icons: {
    icon: "/icons/panda.png",
    apple: "/icons/panda.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
