import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DesktopSideNav, MobileSideNav } from "@/components/SideNav";
import ToggleThemSwitch from "@/components/ToggleThemSwitch";
import IsMobileProvider from "@/components/IsMobileProvider";
import { Label } from "@radix-ui/react-label";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Performant Projects",
  description: "Projects depicting performance practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <IsMobileProvider>
          <DesktopSideNav />
          <div className="flex-1 flex flex-col">
            <header className="shadow-md py-4 px-6 flex gap-4 items-center">
              <MobileSideNav />
              <h1 className="text-2xl font-bold">
                Projects depicting perf practices
              </h1>
              <Label className="ml-auto flex items-center gap-2">
                Dark
                <ToggleThemSwitch />
              </Label>
            </header>
            <main className="px-4 py-8 h-0 flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </IsMobileProvider>
      </body>
    </html>
  );
}
