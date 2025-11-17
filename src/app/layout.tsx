import type { Metadata } from "next";
import "./globals.css";
import "../styles/terminal.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "FE-EKG - Financial Event Evolution Knowledge Graph",
  description: "Interactive visualization of financial event evolution and risk propagation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="terminal-background" style={{ fontFamily: 'var(--terminal-font)', margin: 0, padding: 0 }}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
