import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import CookieConsent from "@/components/CookieConsent"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
})

const orbitron = Orbitron({ 
  subsets: ["latin"], 
  variable: "--font-orbitron",
  display: "swap" 
})

export const metadata: Metadata = {
  title: "NEXORA | Digital Design Studio",
  description: "Studio creativo a Milano specializzato in Web Design, Branding e Sviluppo Next.js. Definiamo il futuro digitale.",
  keywords: ["Web Agency Milano", "Next.js Developer", "Design Studio", "Branding", "Luxecar"],
  openGraph: {
    title: "NEXORA | Il Futuro del Design Digitale",
    description: "Trasformiamo idee audaci in ecosistemi digitali.",
    url: "https://nexora.it",
    siteName: "NEXORA",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} bg-black text-white antialiased selection:bg-[#0044EE] selection:text-white`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
