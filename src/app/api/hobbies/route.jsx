import { collection, getDocs, db } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "hobbies"));
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}