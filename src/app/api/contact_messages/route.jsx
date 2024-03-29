import { collection, getDocs, db, query, where, getDoc, doc } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "contact_form"));
    const data = [];

    for (const contact_form_data of querySnapshot.docs) {
      const formData = contact_form_data.data();
      const userDoc = await getDoc(doc(db, "users", formData.user_id));
      const userData = userDoc.exists() ? userDoc.data() : null;
      if (userData) {
        formData.user_first_name = userData.first_name;
        formData.user_last_name = userData.last_name;
      }
      data.push({ id: contact_form_data.id, ...formData });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}
