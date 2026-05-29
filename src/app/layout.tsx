import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Football Team Balancer",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
