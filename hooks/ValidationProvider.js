import { createContext, useContext, useState } from "react";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
	const [authError, setAuthError] = useState({});
	const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   const usernameRegex = /^[a-zA-Z0-9]*$/;
   const nameRegex = /[@#$^*\-+=|"`\\<>[\]{}]/;
   const shortenEmailRegex = /^.*?(?=@)/;
   const urlRegex = /https?:\/\/(www\.)?[0-9a-zA-Z][-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

	const checkLength = (input, lower, upper) =>
		input.length > upper || input.length < lower;
	const checkEmail = (input) =>
		!emailRegex.test(input) || input.match(emailRegex)[0] != input;
   const checkName = (input) => nameRegex.test(input);
   const checkUsername = (input) => !usernameRegex.test(input);
   const checkConfirmPw = (pw, confirmPw) => confirmPw != pw;
   const checkUrl = (input) => !(input && urlRegex.test(input));

   const isValid = async (name, cond, msg) => {
		if (cond) {
			setAuthError({
				...authError,
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
			} else if (authError[field]) invalid = true;
		}

		if (invalid) {
         setAuthError({ ...authError, ...curError });
         return;
      }

		await submit(values);
	};

	const value = {
		authError,
		setAuthError,
		checkLength,
		checkEmail,
		checkConfirmPw,
      checkName,
      checkUsername,
      isValid,
		handleSubmit,
      checkUrl,
      shortenEmailRegex,
	};

	return (
		<ValidationContext.Provider value={value}>
			{children}
		</ValidationContext.Provider>
	);
};

export default ValidationProvider;
