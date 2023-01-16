import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import TextField from "../common/TextField";
import { useAuth, useValidation } from "../../hooks";
import { useRouter } from "next/router";

const AuthForm = ({ fields, submit }) => {
   const msgs = {
      email: "Invalid email pattern",
      password: "Password must contain between 6 to 20 characters",
   }
	const { pathname } = useRouter();
	const required = fields.map((field) => field.name);
	const initState = required.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {});

	const [values, setValues] = useState(initState);
	const {
		authError,
		setAuthError,
		checkLength,
		checkEmail,
		checkConfirmPw,
		authValid,
		handleSubmit,
	} = useValidation();
	const { loginWithGoogle } = useAuth();

	const handleBlur = (e) => {
		const value = e.target.value.trim();
		const { name } = e.target;

		if (!value && required.includes(name)) {
			setAuthError({
				...authError,
				[name]: "This field is required",
			});
			return;
		}

		if (name == "password") {
			authValid(name, checkLength(value, 6, 20), msgs[name]);
		} else if (name == "confirm_password") {
			authValid(name, checkConfirmPw(values.password, value), msgs[name]);
		} else if (name == "email") {
			authValid(name, checkEmail(value), msgs[name]);
		}
	};

	const handleFocus = (e) => {
		setAuthError({
			...authError,
			[e.target.name]: "",
		});
	};

	const handleChange = (e) => {
      const { value, name } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<form className="w-full max-w-sm py-8 px-10 bg-white rounded-2xl shadow-lg">
			<h1 className="text-[2rem] heading text-center mb-4">
				Welcome to ChiSe
			</h1>

			{fields.map((field, id) => (
				<TextField
					key={id}
					{...field}
					error={authError[field.name]}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
					handleChange={handleChange}
				/>
			))}

			<div className="mt-2 text-center text-primary text-sm">
				<span>{authError.invalid}</span>
			</div>

			<button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(required, values, submit);
				}}
				className="primary-btn btn-transition w-full py-2 px-4 rounded-2xl mt-2"
			>
				Continue
			</button>

			<p className="my-2 font-semibold text-sm text-center">OR</p>

			<button
				className="google-auth-btn btn-transition w-full py-2 px-4 rounded-2xl"
				onClick={(e) => {
					e.preventDefault();
					loginWithGoogle();
				}}
			>
				<div className="flex gap-3 items-center">
					<div>Continue with Google</div>
					<div className="bg-white w-6 h-6 rounded-full flex-center">
						<FcGoogle className="w-5 h-5" />
					</div>
				</div>
			</button>

			<div
				className="font-semibold mt-4 text-center text-sm"
				onClick={() => setAuthError({})}
			>
				{pathname == "/auth/signup" ? (
					<Link href="/auth/login">
						<a>Already a member? Log in</a>
					</Link>
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
