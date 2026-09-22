import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import "./globals.css";

const FloatingBackground = dynamic(() => import("@/components/FloatingBackground"));

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
          <ScrollToTop />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-[#18181b] dark:text-[#f8fafc] bg-white text-gray-900 border border-[#27272a]',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
