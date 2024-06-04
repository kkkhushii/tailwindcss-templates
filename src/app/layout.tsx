import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/index";
import { ProductContextProvider } from "./context/ProductContext/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "20+ Download Free & Premium Tailwind Templates & Admin Dashboards - Built on Latest Technology & Trends",
  description:
    "Looking for Tailwind templates? tailwindcsstemplates.com offers a range of templates built on the latest technology & trends. Download now & give your project a boost!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ProductContextProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ProductContextProvider>
      </body>
    </html>
  );
}
