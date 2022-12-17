import { useState } from "react";
import TextField from "../common/TextField";
import { useAuth, useValidation } from "../../hooks";

const ProfileForm = ({ fields, submit, msgs }) => {
	const required = fields
		.filter((field) => !field.optional)
		.map((field) => field.name);
	const initState = required.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {});

	const [values, setValues] = useState(initState);
	const {
		error,
		setError,
		checkLength,
		checkUsername,
		checkName,
		isValid,
		handleSubmit,
	} = useValidation();
	const {
		logout,
		authUser: { email },
	} = useAuth();

	const handleBlur = (e) => {
		const value = e.target.value.trim();
		const name = e.target.name;

		if (!value && required.includes(name)) {
			setError({
				...error,
				[name]: "This field is required",
			});
			return;
		}

		if (name == "username") {
			isValid(name, checkUsername(value), msgs[name].textDigitOnly);
			isValid(name, checkLength(value, 3, 20), msgs[name].lengthBetween);
		} else if (name == "display_name") {
			isValid(name, checkName(value), msgs[name]);
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
			[e.target.name]: e.target.value.trim(),
		});
	};

	return (
		<form className="w-full max-w-sm py-8 px-10 bg-white rounded-2xl shadow-lg">
			{fields.map((field, id) => (
				<TextField
					key={id}
					{...field}
					displayValue={
						field.name == "username" ?
                  email.match(/^.*?(?=@)/)[0] : ""
					}
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
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(required, values, submit);
				}}
				className="primary-btn w-full py-2 px-4 rounded-2xl mt-2"
			>
				Continue
			</button>

			<div className="font-semibold mt-4 text-center text-sm">
				<div className="cursor-pointer" onClick={logout}>
					Log in with another account
				</div>
			</div>
		</form>
	);
};

export default ProfileForm;
