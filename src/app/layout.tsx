import type { Metadata } from "next";
import { Geist_Mono, Google_Sans_Code, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import { Header } from "@/components/layout/header";
import { TechFilterProvider } from "@/context/tech-filter";
import { Footer } from "@/components/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { cookies } from "next/headers";
import type { Viewport } from "next";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SidebarLinksProvider } from "@/context/sidebar-links";
import { AsciiArt } from "@/components/atoms/ascii-art";

const fontSans = Geist({
  variable: "--sammce-font-sans",
  subsets: ["latin"],
});

const fontCode = Google_Sans_Code({
  variable: "--sammce-font-code",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--sammce-font-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get("sidebar_state");
  const defaultOpen =
    sidebarCookie === undefined || sidebarCookie.value === "true";

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontCode.variable} antialiased`}
      >
        <AsciiArt />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={defaultOpen}>
            <SidebarLinksProvider>
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
            </SidebarLinksProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Sam McElligott",
  description: "My software engineering portfolio. ",
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
