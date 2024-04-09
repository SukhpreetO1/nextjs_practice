"use client";
import { Loader } from "@/app/api/routes/page";
import React, { useEffect, useState } from 'react'

const TermsAndConditions = () => {
  const [termsAndCondition, setTermsAndCondition] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const response = await fetch("/api/terms_and_conditions");
        const data = await response.json();
        if (data.message === "Terms and Conditions collection not found") {
          setTermsAndCondition({ terms_and_conditions_details: "" });
          setLoader(false);
        } else {
          setTermsAndCondition({ terms_and_conditions_details: data.data.terms_and_conditions_details });
          setLoader(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section>
        {loader ? (<Loader />) : (
          <div>
            <div className='terms_and_conditions_heading text-center mx-6'>
              <p className="text-5xl font-bold mb-5">
                Terms and Conditions
              </p>
            </div>
            <div className="policy_content mx-24">
              <div className="font-light text-justify mt-12 mb-24 whitespace-pre-wrap">
                {termsAndCondition?.terms_and_conditions_details}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default TermsAndConditions