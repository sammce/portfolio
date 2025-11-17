import type { Metadata } from "next";
import { Google_Sans_Code, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import { Header } from "@/components/layout/header";
import { TechFilterProvider } from "@/context/tech-filter";
import { Footer } from "@/components/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import type { Viewport } from "next";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SidebarLinksProvider } from "@/context/sidebar-links";
import { AsciiArt } from "@/components/atoms/ascii-art";
import { Suspense } from "react";

const fontSans = Geist({
  variable: "--sammce-font-sans",
  subsets: ["latin"],
});

const fontCode = Google_Sans_Code({
  variable: "--sammce-font-code",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${fontSans.variable} ${fontCode.variable} antialiased`}>
        <AsciiArt />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <SidebarLinksProvider>
              <Suspense>
                <TechFilterProvider>
                  <AppSidebar />
                  <Header />
                  <MainWrapper>
                    <SidebarToggle />
                    {children}
                  </MainWrapper>
                  <Footer />
                  <ScrollToTop />
                </TechFilterProvider>
              </Suspense>
            </SidebarLinksProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Sam McElligott - Software Developer",
  description:
    "My name's Sam McElligott. I'm a full-stack web developer who can take your products to the next level. View my projects, work experience and tech stack.",
  keywords: [
    "portfolio",
    "sam",
    "sammce",
    "sammce.com",
    "sammce.dev",
    "web",
    "website",
    "developer",
    "software",
  ],
  icons: {
    icon: [
      {
        url: "/icon-dark.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-light.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};
