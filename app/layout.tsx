import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { PaddleProvider } from "@/components/PaddleProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boxing Fundamentals",
  description: "Master boxing fundamentals with step-by-step video courses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <AuthProvider>
          <LanguageProvider>
          <PaddleProvider>
            <Navbar />
            {children}
            <Footer />
          </PaddleProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
