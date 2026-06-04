import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnOS — Student Dashboard",
  description: "Next-gen learning dashboard powered by Supabase and Next.js App Router",
  keywords: ["learning", "dashboard", "education", "courses"],
};

export const viewport: Viewport = {
  themeColor: "#080B11",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-base text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
