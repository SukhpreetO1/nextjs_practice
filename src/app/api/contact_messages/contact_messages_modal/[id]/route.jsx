import { getFirestore, doc, getDoc } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const firestore = getFirestore();
    const docRef = doc(firestore, "contact_form", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const formData = docSnap.data();
        const userDocRef = doc(firestore, "users", formData.user_id);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            formData.user_first_name = userData.first_name;
            formData.user_last_name = userData.last_name;
        } else {
            return NextResponse.json({ error: "User data not found" }, { status: 404 });
        }
        return NextResponse.json({ data: formData });
    } else {
        return NextResponse.json({ error: "Contact form data not found" }, { status: 404 });
    }
}
