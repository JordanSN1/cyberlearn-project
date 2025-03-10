// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Abel, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
const abel = Abel({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abel"
});
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue"
});

export const metadata: Metadata = {
  title: "CyberLearn - Apprentissage de la Cybersécurité",
  description: "Plateforme d'apprentissage de la cybersécurité",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${abel.variable} ${bebasNeue.variable}`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}