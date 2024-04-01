"use client";
import React, { useEffect, useState } from 'react';
import { Loader, SubmitButton, TextAreaField, toast } from "@/app/api/routes/page";

const AdminPrivacyPolicy = () => {
    const [error, setError] = useState({});
    const [privacyPolicy, setPrivacyPolicy] = useState({
        privacy_policy_details: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch("/api/privacy_policy");
                const data = await response.json();
                if (data.message === "Privacy policy collection not found") {
                    setPrivacyPolicy({ privacy_policy_details: "" });
                } else {
                    setPrivacyPolicy({ privacy_policy_details: data.data.privacy_policy_details });
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
    
        if (privacyPolicy.privacy_policy_details.length === 0) {
            setError({ privacy_policy_details: "Please enter the details." });
            return;
        }
    
        try {
            const existingPolicyResponse = await fetch("/api/privacy_policy");
            const existingPolicyData = await existingPolicyResponse.json();
    
            let method = "POST";
            if (existingPolicyData.data && existingPolicyData.data.privacy_policy_details) {
                method = "PUT";
            }
    
            const response = await fetch("/api/privacy_policy", {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ privacy_policy_details: privacyPolicy.privacy_policy_details }),
            });
    
            if (response.status === 200) {
                toast.success(method === "POST" ? "Privacy policy added successfully" : "Privacy policy updated successfully", { position: "top-right" });
            } else {
                throw new Error(method === "POST" ? "Failed to add privacy policy" : "Failed to update privacy policy");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later." + error, { position: "top-right" });
        }
    };
    


    return (
        <>
            <section>
                { loading ? ( <Loader /> ) : (
                <div>
                    <div className="admin_privacy_policy_heading ml-60">
                        <div className="heading text-center text-5xl font-bold mt-8 mb-12">
                            Privacy Policy
                        </div>
                    </div>

                    <form className='admin_privacy_policy_form' onSubmit={adminPrivacyPolicyForm}>
                        <div className="admin_policy_content">
                            <TextAreaField className="privacy_policy_details" id="privacy_policy_details" name="privacy_policy_details" div_name="privacy_policy_details" label_heading="Privacy Policy Details" placeholder="Enter the privacy policy detail here" onChange={handleInputChange} value={privacyPolicy.privacy_policy_details} error={error.privacy_policy_details} />
                        </div>
                        <div className="privacy_policy_button">
                            <SubmitButton className="privacy_policy_submit_button" id="privacy_policy_submit_button" name="privacy_policy_submit_button" div_name="privacy_policy_submit_button text-end mr-48 mt-6" label={privacyPolicy.privacy_policy_details ? "Update Privacy Policy" : "Add Privacy Policy"} />
                        </div>
                    </form>
                </div>
                )}
            </section>
        </>
    );
};

export default AdminPrivacyPolicy;
