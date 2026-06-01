import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

const campton = localFont({
  variable: "--font-campton",
  display: "swap",
  src: [
    { path: "../../public/fonts/campton/Campton-Thin.otf", weight: "100" },
    { path: "../../public/fonts/campton/Campton-ExtraLight.otf", weight: "200" },
    { path: "../../public/fonts/campton/Campton-Light.otf", weight: "300" },
    { path: "../../public/fonts/campton/Campton-Book.otf", weight: "400" },
    { path: "../../public/fonts/campton/Campton-Medium.otf", weight: "500" },
    { path: "../../public/fonts/campton/Campton-SemiBold.otf", weight: "600" },
    { path: "../../public/fonts/campton/Campton-Bold.otf", weight: "700" },
    { path: "../../public/fonts/campton/Campton-ExtraBold.otf", weight: "800" },
    { path: "../../public/fonts/campton/Campton-Black.otf", weight: "900" },
  ],
});

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../../public/fonts/poppins/Poppins-Thin.ttf", weight: "100" },
    { path: "../../public/fonts/poppins/Poppins-ExtraLight.ttf", weight: "200" },
    { path: "../../public/fonts/poppins/Poppins-Light.ttf", weight: "300" },
    { path: "../../public/fonts/poppins/Poppins-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/poppins/Poppins-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/poppins/Poppins-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/poppins/Poppins-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/poppins/Poppins-ExtraBold.ttf", weight: "800" },
    { path: "../../public/fonts/poppins/Poppins-Black.ttf", weight: "900" },
  ],
});

export const metadata = {
  title: "MK SALES - Construction Materials",
  description:
    "Premium construction materials for industrial projects across India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${campton.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
