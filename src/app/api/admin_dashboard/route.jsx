import { collection, getDocs, db } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    let count = querySnapshot.size;

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}