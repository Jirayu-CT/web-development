import Navbar from "@/components/Navbar"
import Link from "next/link"
import "./globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Next.js 13.4+ App Router',
  description: 'Next.js 13.4+ Tutorial',
  keywords: 'Jirayu, Next.js, React, TypeScript',
  authors: [{ name: 'Jirayu' }],
}

const layout = ({ children }:{children:React.ReactNode}) => {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
export default layout