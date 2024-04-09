"use client";
import { Loader } from "@/app/api/routes/page";
import React, { useEffect, useState } from 'react'

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const response = await fetch("/api/privacy_policy");
        const data = await response.json();
        if (data.message === "Privacy policy collection not found") {
          setLoader(false);
          setPrivacyPolicy({ privacy_policy_details: "" });
        } else {
          setLoader(false);
          setPrivacyPolicy({ privacy_policy_details: data.data.privacy_policy_details });
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

    return (
    <>
      <section>
      {loader ? (<Loader />) : (
        <div>
          <div className='privacy_policy_heading text-center mx-6'>
          <p className="text-5xl font-bold mb-5">
            Privacy Policy
          </p>
        </div>
        <div className="policy_content mx-24">
          <pre className="font-light text-justify mt-12 mb-24 whitespace-pre-wrap">
            {privacyPolicy?.privacy_policy_details}
          </pre>
        </div>
        </div>
         )}
      </section>
    </>
  )
}

export default PrivacyPolicy