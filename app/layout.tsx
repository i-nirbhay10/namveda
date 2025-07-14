import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { DonationBanner } from "@/components/donation-banner";
import { AdBanner } from "@/components/ad-banner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Namveda - AI-Powered Baby Name Generator",
  description:
    "Discover unique, culturally relevant, and meaningful baby names with AI",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          {/* Top Ad Banner */}
          {/* <AdBanner slot="top-banner" className="hidden md:block" /> */}

          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              {/* Mobile Donation Banner */}
              <DonationBanner className="md:hidden" />

              <div className="flex">
                <div className="flex-1">{children}</div>

                {/* Desktop Sidebar Ad */}
                <div className="hidden xl:block w-80 p-4 space-y-4">
                  <DonationBanner />
                  {/* <AdBanner slot="sidebar" />
                  <AdBanner slot="sidebar" />
                  <AdBanner slot="sidebar" /> */}
                </div>
              </div>
            </main>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>

        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
