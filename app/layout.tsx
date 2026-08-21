import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./experience.css";
import "./export.css";
import "./responsive.css";
import "./motion.css";
import "./about.css";
import "./about-editorial.css";
import "./collection.css";
import "./mobile-fixes.css";
import "./home-extended.css";
export const metadata: Metadata = {
  title: "The Savage NFT — Enter the Savage World",
  description: "Built different. Join The Savage NFT genesis whitelist.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
