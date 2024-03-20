"use client"
import { React, LOGO_IMAGE_URL, Image, useState, Link, AVATAR_IMAGE_URL, signOut, HOME_URL, auth, useRouter, fetchUserDataFromToken, NAVBAR_PROFILE, LOGIN_URL, toast, ToastContainer, NAVBAR_ABOUT, useEffect } from '@/app/api/routes/page';

const Navbar = () => {
    const router = useRouter();

    const [navbar, setNavbar] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            clearCookies();
            localStorage.setItem('hasShownLoggedOutToast', true);
            router.push(LOGIN_URL);
        } catch (error) {
            toast.error("Logout failed. Please try again.", {
                position: "top-right",
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const cleanup = await fetchUserDataFromToken(setUserData);
            return cleanup;
        };
        fetchData();
    }, []);
    
    const clearCookies = () => {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [name, _] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
    };    

    return (
        <section>
            <nav className="w-full z-10">
                <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link href={HOME_URL}>
                                <Image src={LOGO_IMAGE_URL} width={50} height={50} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'}`}>
                            <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                <li className="pb-6 text-xl py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href={HOME_URL} onClick={() => setNavbar(!navbar)}> Home </Link>
                                </li>
                                <li className="pb-6 text-xl py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href="#blogs" onClick={() => setNavbar(!navbar)}> Blogs </Link>
                                </li>
                                <li className="pb-6 text-xl py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href="#contact" onClick={() => setNavbar(!navbar)}> Contact </Link>
                                </li>
                                <li className="pb-6 text-xl py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href="#projects" onClick={() => setNavbar(!navbar)}> Projects </Link>
                                </li>
                                <li className="pb-6 text-xl py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href={NAVBAR_ABOUT} onClick={() => setNavbar(!navbar)}>  About </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <div onClick={toggleDropdown} className='cursor-pointer'>
                                <Image src={AVATAR_IMAGE_URL} width={50} height={50} alt="logo" />
                            </div>
                        </div>
                        {isDropdownOpen && (
                            <div className="z-50 my-4 absolute right-12 top-16 w-60 border rounded-md border-gray-600 p-2">
                                <p className='mb-2'>Hello {userData.first_name ? userData.first_name : ''} {userData.last_name ? userData.last_name : ''}</p>
                                <hr />
                                <Link href={NAVBAR_PROFILE}> <p className='mt-2'>Profile </p></Link>
                                <Link href="#" onClick={handleLogout}> <p className='mt-2'>Logout </p></Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <ToastContainer/>
        </section>
    );
}

export default Navbar