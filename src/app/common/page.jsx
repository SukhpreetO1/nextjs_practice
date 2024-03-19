"use client"
import { React, auth, LOGIN_URL, toast, ToastContainer, useEffect, useRouter, Cookies } from '@/app/api/routes/page';

export default function CommonHome() {
    const router = useRouter();

    useEffect(() => {
        const currentUserCookie = Cookies.get('currentUser');
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
    
        if (!auth.currentUser && !currentUserCookie) {
            router.push(LOGIN_URL);
        } else {
            const hasShownLoginToast = localStorage.getItem('hasShownLoginToast');
            if (!hasShownLoginToast) {
                Cookies.set('currentUser', JSON.stringify(auth.currentUser.accessToken), {
                    expires: expirationTime
                });
    
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