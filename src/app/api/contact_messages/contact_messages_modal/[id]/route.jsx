import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const firestore = getFirestore();
    const docRef = doc(firestore, "contact_form", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const formData = docSnap.data();
        formData.id = docSnap.id;

        const userDocRef = doc(firestore, "users", formData.user_id);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            formData.user_first_name = userData.first_name;
            formData.user_last_name = userData.last_name;
        } else {
            return NextResponse.json({ error: "User data not found" }, { status: 404 });
        }

        const contactFormReplyCollection = collection(firestore, "contact_form_reply");
        
        const querySnapshot = await getDocs(query(contactFormReplyCollection, where("contact_form_id", "==", params.id)));
        const replyData = [];
        querySnapshot.forEach((doc) => {
            const reply = doc.data();
            reply.id = doc.id;
            replyData.push(reply);
        });

        formData.replyData = replyData;

        return NextResponse.json({ data: formData });
    } else {
        return NextResponse.json({ error: "Contact form data not found" }, { status: 404 });
    }
}
