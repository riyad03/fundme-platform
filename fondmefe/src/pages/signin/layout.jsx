import "./globals.css"
import { BrowserRouter as Router } from "react-router-dom"

export default function RootLayout({ children }) {
  return (
    <Router>
      <html lang="en">
        <body className="bg-black text-white">{children}</body>
      </html>
    </Router>
  )
}
