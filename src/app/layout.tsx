import { HexclaveProvider, HexclaveTheme } from "@hexclave/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { hexclaveServerApp } from "@/hexclave/server";
import "@/styles/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ball+",
  description:
    "Generate fair and balanced teams for your football matches based on player skills and positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <HexclaveProvider app={hexclaveServerApp}>
          <HexclaveTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />

              <main className="flex-1">
                <PageContainer>{children}</PageContainer>
              </main>

              <Footer />
              <Toaster />
            </ThemeProvider>
          </HexclaveTheme>
        </HexclaveProvider>
      </body>
    </html>
  );
}
