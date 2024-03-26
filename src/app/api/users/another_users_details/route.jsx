import { getAuth } from "@/app/api/routes/page";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listAllUsers = async (nextPageToken) => {
      try {
        const listUsersResult = await getAuth().listUsers(1000, nextPageToken);
        listUsersResult.users.forEach((userRecord) => {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          await listAllUsers(listUsersResult.pageToken);
        }
      } catch (error) {
        console.log("Error listing users:", error);
        throw error; // Re-throw the error to be caught by the outer try-catch block
      }
    };

    await listAllUsers();

    return NextResponse.json({ data });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.error(error.message, 500);
  }
}