import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "@repo/ui/globals.css"
import { Button } from "@repo/ui/components/ui/button"
import { Edit3 } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "NextLex",
  description: "Testing Lexical editor in Next.js",
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
    {/* Navigation */}
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Edit3 className="h-6 w-6" />
            <span className="font-bold">NextLex</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#features" className="transition-colors hover:text-foreground/80">
              Features
            </a>
            <a href="#demo" className="transition-colors hover:text-foreground/80">
              Demo
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </a>
          </nav>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <main className="flex-1">{children}</main>

    {/* Footer */}
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-6 w-6" />
              <span className="font-bold">NextLex</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The future of rich text editing, built with Next.js and Lexical.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 NextLex. All rights reserved.
        </div>
      </div>
    </footer>
    </body>
    </html>
  )
}
