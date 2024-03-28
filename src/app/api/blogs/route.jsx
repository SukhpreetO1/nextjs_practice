import { getFirestore, collection, getDocs, db, getDoc, doc, updateDoc } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}

export async function PUT(request) {
  try {
    const requestBody = await request.json();
    const { id, dashboard_visible } = requestBody;
    const firestore = getFirestore();
    const blogRef = doc(firestore, "blogs", id);
    const blogSnapshot = await getDoc(blogRef);

    if (blogSnapshot.exists()) {
      await updateDoc(blogRef, {
        dashboard_visible: dashboard_visible === 1 ? 2 : 1,
      });
      return NextResponse.json({ message: "Blog updated successfully" });
    } else {
      return NextResponse.error("Blog not found", 404);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error(error.message, 500);
  }
}