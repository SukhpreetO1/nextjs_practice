import { NextResponse } from "next/server";
import { initializeApp } from "@/db/firebase";

export async function GET() {
  try {
    const admin = initializeApp();
    console.log("admin", admin);

    const userList = await admin.auth().listUsers();
    console.log("userlist", userList);
    
    const userData = userList.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
    }));

    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}
