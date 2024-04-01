import { collection, getDocs, db, addDoc, updateDoc, serverTimestamp } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "privacy_policy"));
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = { id: doc.id, ...doc.data() };
            return NextResponse.json({ data });
        } else {
            return NextResponse.json({ message: "Privacy policy collection not found", status: 200 });
        }
    } catch (error) {
        return NextResponse.error(error.message, 500);
    }
}

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { privacy_policy_details } = requestBody;
        const privacy_policy_data = {
            privacy_policy_details: privacy_policy_details,
            created_at : serverTimestamp(),
            updated_at : serverTimestamp()
        }

        await addDoc(collection(db, "privacy_policy"), privacy_policy_data);
        return NextResponse.json({ message: "Privacy policy added successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.error(error.message, 500);
    }
}

export async function PUT(request) {
    try {
        const requestBody = await request.json();
        const { privacy_policy_details } = requestBody;

        const querySnapshot = await getDocs(collection(db, "privacy_policy"));
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            if (doc.exists()) {
                const privacyPolicyRef = doc.ref;

                await updateDoc(privacyPolicyRef, { privacy_policy_details: privacy_policy_details, updated_at : serverTimestamp() });
                return NextResponse.json({ message: "Privacy policy updated successfully.", status: 200 });
            } else {
                return NextResponse.json({ message: "Privacy policy document does not exist.", status: 404 });
            }
        } else {
            return NextResponse.json({ message: "Privacy policy not found.", status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error(error.message, 500);
    }
}

