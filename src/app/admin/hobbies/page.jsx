"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, Link, Loader, faPenToSquare } from "@/app/api/routes/page"

const Hobbies = () => {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("/api/hobbies");
      const data = await response.json();
      setHobbies(data.data);
      setLoading(false);
    }
    fetchData();
  }, [])
  return (
    <>
      <section>
        {loading ? (
          <Loader />
        ) : (
          <div className="hobbies ml-60">
            <div className="heading text-center text-5xl font-bold mt-8 mb-12">
              Hobbies
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Value</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hobbies.map((hobby, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{hobby.name}</td>
                      <td className="px-6 py-4">{hobby.value}</td>

                      <td className="px-6 py-4 flex">
                        <Link href="#">
                          <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4 mr-2" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hobbies?.length < 1 && <div className="py-2 text-center text-xl">No data found</div>}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Hobbies