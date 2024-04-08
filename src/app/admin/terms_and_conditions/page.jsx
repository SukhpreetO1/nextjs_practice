"use client";
import React, { useEffect, useState } from 'react';
import { ADMIN_DASHBOARD, Link, Loader, SubmitButton, TextAreaField, toast } from "@/app/api/routes/page";

const AdminTermsAndConditions = () => {
  const [error, setError] = useState({});
  const [privacyPolicy, setPrivacyPolicy] = useState({
    terms_and_conditions_details: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/terms_and_conditions");
        const data = await response.json();
        if (data.message === "Terms and Conditions collection not found") {
          setPrivacyPolicy({ terms_and_conditions_details: "" });
        } else {
          setPrivacyPolicy({ terms_and_conditions_details: data.data.terms_and_conditions_details });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPrivacyPolicy(prevPrivacyPolicy => ({ ...prevPrivacyPolicy, [name]: value }));
    setError(prevErrors => ({ ...prevErrors, [name]: null }));
  };

  const adminPrivacyPolicyForm = async (event) => {
    event.preventDefault();

    if (privacyPolicy.terms_and_conditions_details.length === 0) {
      setError({ terms_and_conditions_details: "Please enter the details." });
      return;
    }

    try {
      const existingPolicyResponse = await fetch("/api/terms_and_conditions");
      const existingPolicyData = await existingPolicyResponse.json();

      let method = "POST";
      if (existingPolicyData.data && existingPolicyData.data.terms_and_conditions_details) {
        method = "PUT";
      }

      const response = await fetch("/api/terms_and_conditions", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ terms_and_conditions_details: privacyPolicy.terms_and_conditions_details }),
      });

      if (response.status === 200) {
        toast.success(method === "POST" ? "Terms and Conditions added successfully" : "Terms and Conditions updated successfully", { position: "top-right" });
      } else {
        throw new Error(method === "POST" ? "Failed to add Terms and Conditions" : "Failed to update Terms and Conditions");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later." + error, { position: "top-right" });
    }
  };



  return (
    <>
      <section>
        {loading ? (<Loader />) : (
          <div>
            <div className="admin_terms_and_conditions_heading ml-60">
              <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                Terms and Conditions
              </div>
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
                      <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Terms and Conditions</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <form className='admin_terms_and_conditions_form' onSubmit={adminPrivacyPolicyForm}>
              <div className="admin_policy_content">
                <TextAreaField className="terms_and_conditions_details" id="terms_and_conditions_details" name="terms_and_conditions_details" div_name="terms_and_conditions_details" label_heading="Terms and Conditions Details" placeholder="Enter the Terms and Conditions here" onChange={handleInputChange} value={privacyPolicy.terms_and_conditions_details} error={error.terms_and_conditions_details} />
              </div>
              <div className="terms_and_conditions_button">
                <SubmitButton className="terms_and_conditions_submit_button" id="terms_and_conditions_submit_button" name="terms_and_conditions_submit_button" div_name="terms_and_conditions_submit_button text-end mr-48 mt-6" label={privacyPolicy.terms_and_conditions_details ? "Update Terms and Conditions" : "Add Terms and Conditions"} />
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminTermsAndConditions;
