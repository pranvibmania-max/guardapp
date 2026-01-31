import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSidebar from "./components/ClientSidebar";

const inter = Inter({ subsets: ["latin"] }); // Configured Inter

export const metadata: Metadata = {
  title: "GuardOne - Parental Control",
  description: "Advanced Family Safety Dashboard",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GuardOne"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased flex bg-[#0f172a] text-slate-100`}
        suppressHydrationWarning={true}
      >
        <ClientSidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative z-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
