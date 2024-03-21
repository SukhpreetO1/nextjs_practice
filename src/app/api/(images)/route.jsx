import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetch("https://picsum.photos/v2/list?limit=10");
  const res = await response.json()
  return NextResponse.json({data:res})
}