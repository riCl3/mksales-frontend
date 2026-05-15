import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "MK SALES - Construction Materials",
  description: "Premium construction materials for industrial projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col text-zinc-900 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}