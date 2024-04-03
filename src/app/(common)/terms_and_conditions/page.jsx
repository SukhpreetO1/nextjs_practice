"use client";
import React, { useEffect, useState } from 'react'

const TermsAndConditions = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/terms_and_conditions");
        const data = await response.json();
        if (data.message === "Terms and Conditions collection not found") {
          setPrivacyPolicy({ terms_and_conditions_details: "" });
        } else {
          setPrivacyPolicy({ terms_and_conditions_details: data.data.terms_and_conditions_details });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className='terms_and_conditions_heading text-center mx-6'>
          <p className="text-5xl font-bold mb-5">
            Terms and Conditions
          </p>
        </div>
        <div className="policy_content mx-24">
          <div className="font-light text-justify mt-12 mb-24 whitespace-pre-wrap">
            {privacyPolicy?.terms_and_conditions_details}
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditions