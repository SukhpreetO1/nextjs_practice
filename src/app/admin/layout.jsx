"use client"
import { Sidebar } from "@/app/api/routes/page";

export default function CommonLayout({
  children,
}) {
  return (
    <section>
      <Sidebar/>
      {children}
    </section>
  )
}