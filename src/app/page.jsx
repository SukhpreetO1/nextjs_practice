"use client"
import { React, auth, LOGIN_URL, toast, ToastContainer, useEffect, Navbar, useRouter, Cookies } from '@/app/api/routes/page';

export default function CommonHome() {
    const router = useRouter();

    useEffect(() => {
        const currentUserCookie = Cookies.get('currentUser');
        if (!auth.currentUser && !currentUserCookie) {
            router.push(LOGIN_URL);
        } else if (!auth.currentUser && currentUserCookie) {
            const currentUser = JSON.parse(currentUserCookie);
            auth.currentUser = currentUser;
        } else {
            Cookies.set('currentUser', JSON.stringify(auth.currentUser));
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