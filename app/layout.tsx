import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shahin4l-platform-hnsq.vercel.app"),
  title: {
    default: "SHAHIN4L | Md Shahin Alam",
    template: "%s | SHAHIN4L",
  },
  description:
    "Building Better Operations Through People, Process & Technology.",
  openGraph: {
    title: "SHAHIN4L | Md Shahin Alam",
    description:
      "Building Better Operations Through People, Process & Technology.",
    type: "website",
  },
  robots: { index: true, follow: true },
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
