"use client"
import { React, auth, LOGIN_URL, toast, ToastContainer, useEffect, useRouter, Cookies } from '@/app/api/routes/page';

export default function CommonHome() {
    const router = useRouter();

    useEffect(() => {
        const currentUserCookie = Cookies.get('currentUser');
        if (!auth.currentUser && !currentUserCookie) {
            router.push(LOGIN_URL);
        } else {
            const hasShownLoginToast = localStorage.getItem('hasShownLoginToast');
            if (!hasShownLoginToast) {
                Cookies.set('currentUser', JSON.stringify(auth.currentUser));
                toast.success("Login successfully", {
                    position: "top-right",
                });
                localStorage.setItem('hasShownLoginToast', true);
            }
        }
    }, [router]);

    if (!auth.currentUser) {
        return null;
    }

    return (
        <>
            <ToastContainer />
        </>
    );
}