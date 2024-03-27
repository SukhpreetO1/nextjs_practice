"use client"
import { ADMIN_DASHBOARD, FontAwesomeIcon, Link, faPenToSquare } from "@/app/api/routes/page";
import { useEffect, useState } from "react";

const AnotherPlatformUserDetail = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data.data);
        }
        fetchData();
    }, [])

    const getGenderLabel = (value) => {
        const gender = genderOptions.find(option => option.value == value);
        return gender ? gender.label : '';
    };

    const getHobbiesLabels = (values) => {
        const hobbies = values.map(value => {
            const hobby = hobbiesOptions.find(option => option.value === value);
            return hobby ? hobby.label : '';
        });
        return hobbies.join(', ');
    };
        return (
        <>
            <section>
                <div className="blogs_page ml-60">
                    <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                        User Details
                    </div>

                    <div className="breadcrumbs">
                        <nav className="flex px-5 py-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 w-64" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link href={ADMIN_DASHBOARD} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">User Details</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Provider</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.username}</td>

                                        <td className="px-6 py-4 flex">
                                            <Link href="#">
                                                <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users?.length < 1 && <div className="py-2 text-center text-xl">No data found</div>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AnotherPlatformUserDetail;