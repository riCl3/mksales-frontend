import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

const campton = localFont({
  variable: "--font-campton",
  display: "swap",
  src: [
    { path: "../../public/fonts/campton/Campton-Book.otf", weight: "400" },
    { path: "../../public/fonts/campton/Campton-Medium.otf", weight: "500" },
    { path: "../../public/fonts/campton/Campton-SemiBold.otf", weight: "600" },
    { path: "../../public/fonts/campton/Campton-Bold.otf", weight: "700" },
  ],
});

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../../public/fonts/poppins/Poppins-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/poppins/Poppins-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/poppins/Poppins-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/poppins/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const metadata = {
  title: "MK SALES - Construction Materials",
  description:
    "Premium construction materials for industrial projects across India.",
  openGraph: {
    title: "MK SALES - Construction Materials",
    description: "Premium construction materials for industrial projects across India.",
    url: "https://mksales.co.in",
    siteName: "MK SALES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK SALES - Construction Materials",
    description: "Premium construction materials for industrial projects across India.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${campton.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
