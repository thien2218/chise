import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import AuthField from "./AuthField";
import { useValidation } from "../../hooks";

const AuthForm = ({ fields, submit }) => {
	const required = fields
		.filter((field) => !field.optional)
		.map((field) => field.name);
	const initState = required.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {});

	const [values, setValues] = useState(initState);
	const { error, setError, handleSubmit, checkLength } = useValidation();

	const handleBlur = (label, name, e) => {
		const value = e.target.value;

		setValues({
			...values,
			[name]: value,
		});
	};

	const handleFocus = (e) => {
		setError({
			...error,
			[e.target.name]: "",
		});
	};

	return (
		<form className="form">
			<h1 className="text-[2rem] heading text-center mb-4">
				Welcome to ChiSe
			</h1>

			{fields.map((field, id) => (
				<AuthField
					key={id}
					{...field}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
				/>
			))}

			<div className="mt-2 text-center text-primary text-sm">
				<span>{error.invalid}</span>
			</div>

			<button
				onClick={(e) => handleSubmit(e, required, values, submit)}
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
