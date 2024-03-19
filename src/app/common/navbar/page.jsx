"use client"
import { React, LOGO_IMAGE_URL, Image, useState, Link, AVATAR_IMAGE_URL, signOut, auth, useRouter, HOME_URL, PROFILE, COMMON_HOME_URL, LOGIN_URL, toast, ToastContainer, ABOUT } from '@/app/api/routes/page';

const Navbar = () => {
    const router = useRouter();

    const [navbar, setNavbar] = useState(false);

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
                            <Link href={COMMON_HOME_URL}>
                                <Image src={LOGO_IMAGE_URL} width={50} height={50} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'}`}>
                            <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                                <li className="pb-6 text-xl py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-orange-700  border-orange-700  md:hover:text-orange-700 md:hover:bg-transparent">
                                    <Link href={COMMON_HOME_URL} onClick={() => setNavbar(!navbar)}> Home </Link>
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
                                    <Link href={ABOUT} onClick={() => setNavbar(!navbar)}>  About </Link>
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
                            <div className="z-50 my-4 absolute right-12 top-16 w-40 border rounded-md border-gray-600 p-2">
                                <Link href={PROFILE}> <p className=''>Profile </p></Link>
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