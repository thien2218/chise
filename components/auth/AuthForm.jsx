import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import AuthField from "./AuthField";
import { useAuth, useValidation } from "../../hooks";
import { useRouter } from "next/router";

const AuthForm = ({ fields, submit }) => {
	const { pathname } = useRouter();
	const required = fields
		.filter((field) => !field.optional)
		.map((field) => field.name);
	const initState = required.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {});

	const [values, setValues] = useState(initState);
	const {
		error,
		setError,
		checkLength,
		checkEmail,
		checkConfirmPw,
		isValid,
		handleSubmit,
	} = useValidation();
	const { logout } = useAuth();

	const handleBlur = (e) => {
		const value = e.target.value;
		const name = e.target.name;

      if (!value && required.includes(name)) {
         setError({
            ...error,
            [name]: "This field is required",
         });
         return;
      }

      if (name == "username") {
         isValid(name, checkLength(value, 3, 20));
      } else if (name == "password") {
         isValid(name, checkLength(value, 6, 20));
      } else if (name == "confirm_password") {
         isValid(name, checkConfirmPw(values.password, value));
      } else if (name == "email") {
         isValid(name, checkEmail(value));
      }
	};

	const handleFocus = (e) => {
		setError({
			...error,
			[e.target.name]: "",
		});
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
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
               error={error[field.name]}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
					handleChange={handleChange}
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
				{pathname == "/auth/signup" ? (
					<Link href="/auth/login">
						<a>Already a member? Log in</a>
					</Link>
				) : pathname == "/auth/profile" ? (
					<div className="cursor-pointer" onClick={logout}>Log in with another account</div>
				) : (
					<Link href="/auth/signup">
						<a>New to ChiSe? Sign up</a>
					</Link>
				)}
			</div>
		</form>
	);
};

export default AuthForm;
