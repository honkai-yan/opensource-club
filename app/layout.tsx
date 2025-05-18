import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CDUESTC-开放原子开源社团",
  description: "CDUESTC Open Atom Opensource Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-400">{children}</body>
    </html>
  );
}
