import { createContext, useContext, useState } from "react";
import { Firestore } from "../services";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
	const [error, setError] = useState({});
	const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   const msgs = {
      required: "This field is required",
      email: "Invalid email pattern",
      password: "Password must contains between 6 to 20 characters",
      confirm_password: "Password confirmation does not match",
      username: "Username must contains between 3 to 20 characters",
   }

	const checkLength = (input, lower, upper) =>
		input.length > upper || input.length < lower;
	const checkEmail = (input) =>
		input.match(emailRegex) == null || input.match(emailRegex)[0] != input;
   const checkRequired = (name, required, input) => required.includes(name) && !input;
   const checkConfirmPw = (pw, confirmPw) => confirmPw == pw;
   const checkUsername = async (username) =>
      await Firestore.usernameExists(username);

	const isValid = async (name, field, cond) => {
		if ((!field || name == field) && cond) {
			setError({
				...error,
				[name]: msgs[name],
			});
		}
	};

	const handleSubmit = async (e, required, values, submit) => {
		e.preventDefault();
		const curError = {};
		let invalid = false;

		for (const field of required) {
			if (!values[field]) {
				curError = { ...curError, [field]: msgs["required"] };
				invalid = true;
			} else if (error[field]) invalid = true;
		}

		setError({ ...error, ...curError });
		if (invalid) return;

		await submit(values);
	};

	const value = {
		error,
		setError,
		checkRequired,
		checkLength,
		checkEmail,
		checkConfirmPw,
		checkUsername,
      isValid,
		handleSubmit,
	};

	return (
		<ValidationContext.Provider value={value}>
			{children}
		</ValidationContext.Provider>
	);
};

export default ValidationProvider;
