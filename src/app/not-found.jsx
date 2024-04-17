import { Link, NAVBAR_DASHBOARD } from "@/app/api/routes/page"
 
export default function NotFound() {
  return (
    <>
        <div className="bg-gray-500 h-full">
            <div className="text-center text-white p-24">
                <div className="mx-96 border-2 p-16 rounded-2xl">
                    <h2 className="text-7xl uppercase">Not Found !!</h2>
                    <p className="text-2xl mt-4">Could not find requested resource</p>
                    <p className="text-2xl mt-4 pb-12">Please contact with the admin regarding this page.</p>
                    <Link href={NAVBAR_DASHBOARD} className="text-xl border-2 border-blue-700 rounded-lg px-4 py-2 bg-blue-700">Return Home</Link>
                </div>
            </div>
        </div>
    </>
  )
}