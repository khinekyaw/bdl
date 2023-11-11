import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import Layout from "@/components/Layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BallsDon'tLie - Your Source for Sports News and Analysis",
  description:
    "BallsDon'tLie is a website dedicated to providing you with the latest sports news, analysis, and opinion. We cover all major sports, from baseball and basketball to football and soccer. Our team of experts is passionate about sports and committed to providing you with the most accurate and insightful information possible. Whether you're a casual fan or a diehard supporter, BallsDon'tLie is your one-stop shop for everything sports.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
