"use client"
import { React, auth, LOGIN_URL, toast, ToastContainer, useEffect, Navbar, useRouter } from '@/app/api/routes/page';

export default function CommonHome() {
    const router = useRouter();

    useEffect(() => {
        if (!auth.currentUser) {
            router.push(LOGIN_URL);
        } else if (auth.currentUser?.email != null) {
            toast.success("Login successfully", {
                position: "top-right",
            });
        }
    }, [router]);

    if (!auth.currentUser) {
        return null;
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
        </>
    );
}