import { useState, useEffect } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import AuthField from "./AuthField";
import { useValidation } from "../../hooks";

const AuthForm = ({ fields, submit }) => {
   const [values, setValues] = useState({});
   const { setError } = useValidation();
   
   const handleBlur = (name, e) => {
      setValues({
         ...values,
         [name]: e.target.value,
      })
   }

   const handleFocus = (e) => setError({
      [e.target.name]: ""
   })

   const handleSubmit = async (e) => {
      e.preventDefault();
      await submit(values.email, values.password);
   }

	return (
		<form className="form">
			<h1 className="text-[2rem] heading text-center mb-4">
				Welcome to ChiSe
			</h1>

			{fields.map((field, id) => (
				<AuthField
					key={id}
					// message={message}
					{...field}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
				/>
			))}

			<div className="mt-2 text-center text-primary text-sm">
				<span>
					{/* {message.invalidData && isSignupPage
						? "The username has already existed"
						: message.invalidData && !isSignupPage
						? "Username or password provided is incorrect"
						: ""} */}
				</span>
			</div>

			<button
				onClick={handleSubmit}
				className="primary-btn w-full py-2 px-4 rounded-2xl mt-2"
			>
				Continue
			</button>

			<p className="my-2 font-semibold text-sm text-center">OR</p>

			<button className="google-auth-btn w-full py-2 px-4 rounded-2xl">
				<div className="flex gap-3 items-center">
					<div>Continue with Google</div>
					<div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
						<FcGoogle className="w-5 h-5" />
					</div>
				</div>
			</button>

			<div className="font-semibold mt-4 text-center text-sm">
				{/* {isSignupPage ? (
					<Link href="/login">
						<a>Already a member? Log in</a>
					</Link>
				) : ( */}
					<Link href="/signup">
						<a>New to ChiSe? Sign up</a>
					</Link>
				{/* )} */}
			</div>
		</form>
	);
};

export default AuthForm;
