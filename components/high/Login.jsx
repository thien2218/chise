import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormField from "../low/FormField";

const LogIn = ({ handleBlur, handleFocus, handleSubmit, message }) => {
	const fields = [
		{
			label: "Username",
			name: "username",
			type: "text",
			placeholder: "Enter your username",
		},
		{
			label: "Password",
			name: "password",
			type: "password",
			placeholder: "Enter your password",
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
			<button className="bg-[#257ef2] font-semibold text-white hover:bg-[#086df2] w-full py-2 px-4 rounded-2xl transition ease-in-out duration-100 flex justify-center">
				<div className="flex gap-3 items-center">
					<div>Continue with Google</div>
					<div className="bg-white w-6 h-6 rounded-full flex justify-center items-center">
						<FcGoogle className="w-5 h-5" />
					</div>
				</div>
			</button>

			<div className="font-semibold mt-4 text-center text-sm">
				<Link href="/signup">
					<a>New to ChiSe? Sign up</a>
				</Link>
			</div>
		</form>
	);
};

export default LogIn;
