import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingBackground from "@/components/FloatingBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepak Kumar | AI Engineer",
  description:
    "AI Engineer passionate about Machine Learning, Data Science, and building intelligent predictive models. Open to opportunities.",
  keywords: [
    "Deepak Kumar",
    "AI Engineer",
    "Machine Learning",
    "Data Science",
    "Python",
    "Portfolio",
    "LPU Jalandhar",
  ],
  authors: [{ name: "Deepak Kumar" }],
  openGraph: {
    title: "Deepak Kumar | AI Engineer",
    description:
      "AI Engineer passionate about Machine Learning, Data Science, and predictive modeling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans relative z-10">
        <ThemeProvider>
          <FloatingBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
