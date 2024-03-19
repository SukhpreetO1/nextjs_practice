"use client"
import { React, auth, LOGIN_URL, toast, ToastContainer, useEffect, useRouter, Cookies } from '@/app/api/routes/page';

export default function CommonHome() {
    const router = useRouter();

    useEffect(() => {
        const currentUserCookie = Cookies.get('currentUserToken');
        if (!auth.currentUser && !currentUserCookie) {
            router.push(LOGIN_URL);
        } else {
            const hasShownLoginToast = localStorage.getItem('hasShownLoginToast');
            if (!hasShownLoginToast) {
                toast.success("Login successfully", {
                    position: "top-right",
                });

                localStorage.setItem('hasShownLoginToast', true);
                setTimeout(() => {
                    localStorage.removeItem('hasShownLoginToast');
                }, 10 * 60 * 1000);
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