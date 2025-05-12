import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "电子科技大学成都学院-开放原子开源社团",
  description: "CDUESTC Open Atom Opensource Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
