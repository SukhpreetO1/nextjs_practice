import { getFirestore, collection, getDocs, db, getDoc, doc, updateDoc, query, where } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const querySnapshot = await getDocs(query(collection(db, "blogs_comment_reply"), where("blog_id", "==", params.id)));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}