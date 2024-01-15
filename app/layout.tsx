import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peerlist | Recruiter Dashboard",
  description: "Professional Network for people in tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-0 m-0 box-border`}>
        {children}
      </body>
    </html>
  );
}
