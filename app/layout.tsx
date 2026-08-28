import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telegram Web",
  description: "Deterministic Telegram conversation mirror for Averlo Stage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html className="dark" lang="en"><body>{children}</body></html>;
}
