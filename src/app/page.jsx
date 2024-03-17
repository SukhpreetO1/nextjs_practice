"use client"
import { React, LOGIN_URL } from '@/app/api/routes/page';

export default function Home() {
  return (
  <>
    home page
    <button onClick={LOGIN_URL}>Logout</button>
  </>
  )
}
