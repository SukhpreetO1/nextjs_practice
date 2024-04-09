"use client"
import { ADMIN_DASHBOARD, FontAwesomeIcon, Link, Loader, faPenToSquare } from "@/app/api/routes/page";
import { useEffect, useState } from "react";

const genderOptions = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
];

const hobbiesOptions = [
    { label: 'Football', value: '1', selected: false },
    { label: 'Cricket', value: '2', selected: false },
    { label: 'Basketball', value: '3', selected: false },
    { label: 'Tennis', value: '4', selected: false },
    { label: 'Others', value: '5', selected: false },
];

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        async function fetchData() {
            setLoading(true);
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data.data);
        }
        fetchData();
        setLoading(false);
    }, [])

    const getGenderLabel = (value) => {
        const gender = genderOptions.find(option => option.value == value);
        return gender ? gender.label : '';
    };

    const getHobbiesLabels = (values) => {
        if (values !== ''){
            const hobbies = values.map(value => {
                const hobby = hobbiesOptions.find(option => option.value === value);
                return hobby ? hobby.label : '';
            });
            return hobbies.join(', ');
        }
    };
        return (
        <>
            <section>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="blogs_page ml-60">
                        <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                            User Details
                        </div>

                        <div className="admin_breadcrumbs">
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
                                        <th scope="col" className="px-6 py-3">First name</th>
                                        <th scope="col" className="px-6 py-3">Last name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Username</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3">Date of birth</th>
                                        <th scope="col" className="px-6 py-3">Mobile Number</th>
                                        <th scope="col" className="px-6 py-3">Gender</th>
                                        <th scope="col" className="px-6 py-3">Hobbies</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{user.first_name}</td>
                                            <td className="px-6 py-4">{user.last_name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.username}</td>
                                            <td className="px-6 py-4">{user.role_id === 1 ? 'User' : 'Admin'}</td>
                                            <td className="px-6 py-4">{user.date_of_birth}</td>
                                            <td className="px-6 py-4">{user.mobile_number}</td>
                                            <td className="px-6 py-4">{getGenderLabel(user.gender)}</td>
                                            <td className="px-6 py-4">{getHobbiesLabels(user.hobbies)}</td>

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
                )}
            </section>
        </>
    )
}

export default User;