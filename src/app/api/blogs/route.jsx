import { getFirestore, collection, getDocs, db } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  const firestore = getFirestore();

  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}
