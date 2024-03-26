import { getFirestore, doc, getDoc } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET(req ,{ params }) {
    const firestore = getFirestore();
    const docRef = doc(firestore, "blogs", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return NextResponse.json({ data: docSnap.data() });
    } else {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
}
