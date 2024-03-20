"use client"
import { usePathname } from "@/app/api/routes/page";

export default function CommonLayout({
  children,
}) {
  const pathname = usePathname();
  return (
    <section>
      {children}
    </section>
  )
}