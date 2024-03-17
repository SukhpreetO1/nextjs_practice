import React from 'react'

const SubmitButton = ({ name, id, className, div_name }) => {
  return (
    <>
      <div className="container mt-3">
        <div className={`${div_name} text-center`}>
          <button type="submit" id={id} name={name} className={`${className} rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}>
            {className === "signup_submit_button" ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>
    </>
  )
}

export default SubmitButton