import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://angaziconcepts.com"),
  title: {
    default: "Angazi Concepts — Find Trusted Workers. Find Meaningful Work.",
    template: "%s | Angazi Concepts",
  },
  description:
    "Angazi connects skilled and unskilled workers with individuals, businesses and organizations across Nigeria. Find trusted workers or find meaningful work today.",
  keywords: [
    "find artisans Nigeria",
    "hire workers Nigeria",
    "find work Nigeria",
    "carpenter",
    "electrician",
    "plumber",
    "Angazi Concepts",
  ],
  openGraph: {
    title: "Angazi Concepts — Find Trusted Workers. Find Meaningful Work.",
    description:
      "Nigeria's trusted platform connecting skilled and unskilled workers with the people who need them.",
    url: "https://angaziconcepts.com",
    siteName: "Angazi Concepts",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angazi Concepts",
    description: "Find Trusted Workers. Find Meaningful Work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
