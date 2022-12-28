import { createContext, useContext, useState } from "react";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
	const [error, setError] = useState({});
	const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   const usernameRegex = /^[a-zA-Z0-9]*$/;
   const nameRegex = /[@#$^*\-+=|"`\\<>[\]{}]/;
   const shortenEmailRegex = /^.*?(?=@)/;

	const checkLength = (input, lower, upper) =>
		input.length > upper || input.length < lower;
	const checkEmail = (input) =>
		!emailRegex.test(input) || input.match(emailRegex)[0] != input;
   const checkName = (input) => nameRegex.test(input);
   const checkUsername = (input) => !usernameRegex.test(input);
   const checkConfirmPw = (pw, confirmPw) => confirmPw != pw;

   const isValid = async (name, cond, msg) => {
		if (cond) {
			setError({
				...error,
				[name]: msg,
			});
		}
	};

	const handleSubmit = async (required, values, submit) => {
		const curError = {};
		let invalid = false;

		for (const field of required) {
			if (!values[field]) {
				curError = { ...curError, [field]: "This field is required" };
				invalid = true;
			} else if (error[field]) invalid = true;
		}

		if (invalid) {
         setError({ ...error, ...curError });
         return;
      }

		await submit(values);
	};

	const value = {
		error,
		setError,
		checkLength,
		checkEmail,
		checkConfirmPw,
      checkName,
      checkUsername,
      isValid,
		handleSubmit,
      shortenEmailRegex,
	};

	return (
		<ValidationContext.Provider value={value}>
			{children}
		</ValidationContext.Provider>
	);
};

export default ValidationProvider;
