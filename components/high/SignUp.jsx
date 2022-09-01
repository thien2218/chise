import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormField from "../low/FormField";

const SignUp = ({ handleBlur, handleFocus, handleSubmit, message }) => {
	const fields = [
		{
			label: "Username",
			name: "username",
			type: "text",
			placeholder: "Create a username",
		},
		{
			label: "Email",
			name: "email",
			type: "text",
			placeholder: "Ex: example@domain.com",
		},
		{
			label: "Password",
			name: "password",
			type: "password",
			placeholder: "Create a password",
		},
		{
			label: "Confirm password",
			name: "password_confirmation",
			type: "password",
			placeholder: "Confirm password",
		},
	];

	return (
		<form className="form">
			<h1 className="text-[2rem] heading text-center mb-4">
				Welcome to ChiSe
			</h1>

			{fields.map((field, id) => (
				<FormField
					key={id}
					message={message}
					{...field}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
				/>
			))}

			<button
				onClick={handleSubmit}
				className="primary-btn w-full py-2 px-4 rounded-2xl mt-4"
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
				<Link href="/login">
					<a>Already a member? Log in</a>
				</Link>
			</div>
		</form>
	);
};

export default SignUp;
