import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Ovo } from "next/font/google"


const ovo = Ovo({
  weight: "400",
  subsets: ["latin"]
})

// set NEXT_PUBLIC_SITE_URL to the deployed origin so shared links get absolute
// og:url / og:image (link previews on twitter, slack, etc. need absolute urls)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Personal Portfolio",
    template: "%s · Shivam Verma",
  },
  description: "My personal portfolio and concept explanations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${ovo.className} bg-white text-[#191919]`}>{children}</body>
    </html>
  )
}