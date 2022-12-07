import { createContext, useContext, useState } from "react";
import { Firestore } from "../services";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
	const [error, setError] = useState({});
	const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   const msgs = {
      email: "Invalid email pattern",
      password: "Password must contains between 6 to 20 characters",
      confirm_password: "Password confirmation does not match",
      username: "Username must contains between 3 to 20 characters",
   }

	const checkLength = (input, lower, upper) =>
		input.length > upper || input.length < lower;
	const checkEmail = (input) =>
		input.match(emailRegex) == null || input.match(emailRegex)[0] != input;
   const checkConfirmPw = (pw, confirmPw) => confirmPw != pw;

   const isValid = async (name, cond) => {
		if (cond) {
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

		if (invalid) {
         setError({ ...error, ...curError });
         return;
      }

      setError({});
		await submit(values);
	};

	const value = {
		error,
		setError,
		checkLength,
		checkEmail,
		checkConfirmPw,
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
