"use client"
import { LOGIN_URL, Navbar, SIGNUP_URL, usePathname, FORGOT_PASSWORD, Footer } from "@/app/api/routes/page";

export default function CommonLayout({
  children,
}) {
  const pathname = usePathname();
  return (
    <>
      <main>
        {pathname === LOGIN_URL || pathname === SIGNUP_URL || pathname === FORGOT_PASSWORD ? null : <Navbar />}
        {children}
        {pathname === LOGIN_URL || pathname === SIGNUP_URL || pathname === FORGOT_PASSWORD ? null : <Footer />}
      </main>
    </>
  )
}