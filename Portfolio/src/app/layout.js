import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rumais P P | Creative Software Developer",
  description: "Creative software developer building immersive web and mobile experiences with Flutter, Three.js, and the MERN stack.",
  openGraph: {
    title: "Rumais P P | Creative Software Developer",
    description: "Creative software developer building immersive web and mobile experiences with Flutter, Three.js, and the MERN stack.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
