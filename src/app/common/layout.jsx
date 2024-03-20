// "use client"
// import { LOGIN_URL, Navbar, SIGNUP_URL, usePathname, FORGOT_PASSWORD } from "@/app/api/routes/page";

// export default function CommonLayout({
//   children,
// }) {
//   const pathname = usePathname();
//   return (
//     <section>
//       {pathname === LOGIN_URL || pathname === SIGNUP_URL || pathname === FORGOT_PASSWORD ? null : <Navbar />}
//       {children}
//     </section>
//   )
// }