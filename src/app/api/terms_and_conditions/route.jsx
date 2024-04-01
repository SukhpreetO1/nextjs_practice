import { collection, getDocs, db, addDoc, updateDoc, serverTimestamp } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "terms_and_conditions"));
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = { id: doc.id, ...doc.data() };
            return NextResponse.json({ data });
        } else {
            return NextResponse.json({ message: "Terms and Conditions collection not found", status: 200 });
        }
    } catch (error) {
        return NextResponse.error(error.message, 500);
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { terms_and_conditions_details } = requestBody;
        const terms_and_conditions_data = {
            terms_and_conditions_details: terms_and_conditions_details,
            created_at : serverTimestamp(),
            updated_at : serverTimestamp()
        }

        await addDoc(collection(db, "terms_and_conditions"), terms_and_conditions_data);
        return NextResponse.json({ message: "Terms and Conditions added successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.error(error.message, 500);
    }
}

export async function PUT(request) {
    try {
        const requestBody = await request.json();
        const { terms_and_conditions_details } = requestBody;

        const querySnapshot = await getDocs(collection(db, "terms_and_conditions"));
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            if (doc.exists()) {
                const privacyPolicyRef = doc.ref;

                await updateDoc(privacyPolicyRef, { terms_and_conditions_details: terms_and_conditions_details, updated_at: serverTimestamp() });
                return NextResponse.json({ message: "Terms and Conditions updated successfully.", status: 200 });
            } else {
                return NextResponse.json({ message: "Terms and Conditions does not exist.", status: 404 });
            }
        } else {
            return NextResponse.json({ message: "Terms and Conditions are not found.", status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error(error.message, 500);
    }
}

