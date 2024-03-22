// import { Link } from "@/app/api/routes/page";

import Link from "next/link"

const AdminDashboard = () => {
  return (
    <>
      <section>
        <div className="admin_dashboard ml-60">
          <div className="cards mt-4">
            <Link href="#" className="block max-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">10</h5>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDashboard