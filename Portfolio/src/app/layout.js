import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Rumais P P | Creative Software Developer",
  description: "Creative software developer specializing in high-performance digital systems, full-stack architectures, and 3D web experiences.",
  openGraph: {
    title: "Rumais P P | Creative Software Developer",
    description: "Creative software developer specializing in high-performance digital systems, full-stack architectures, and 3D web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Cursor />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
