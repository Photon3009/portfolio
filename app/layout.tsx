import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Ovo } from "next/font/google"


const ovo = Ovo({ 
  weight: "400",
  subsets: ["latin"] 
})

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "My personal portfolio and concept explanations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${ovo.className} bg-[#101010]`}>{children}</body>
    </html>
  )
}