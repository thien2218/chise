import { createContext, useContext, useState } from "react";
import { Firestore } from "../services";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
   const [error, setError] = useState({});
   const requiredMsg = "This field is required!";
   const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      
   const checkLength = (input, name, label, lower, upper) => {
      if (input.length > upper || input.length < lower) {
         setError({
            ...error,
            [name]: `${label} must contains between ${lower} - ${upper} characters`,
         });
      }
   }

   const checkRequired = (input, name) => {
      if (!input) {
         setError({
            ...error,
            [name]: requiredMsg,
         });
      }
   }
      
   const checkEmail = (input) => {
      if(input.match(emailRegex) == null || input.match(emailRegex)[0] != input) {
         setError({
            ...error,
            "email": "Invalid email pattern",
         });
      }
   }

   const checkConfirmPw = (pw, confirmPw) => {
      if (pw !== confirmPw) {
         setError({
            ...error,
            "confirm_password": "Two passwords don't match each other",
         });
      }
   }

   const checkUsernameExists = (username) => {

   }

   const handleSubmit = async (e, required, values, submit) => {
      e.preventDefault();
      const curError = {};
      let invalid = false;

      for (const field of required) {
         if (!values[field]) {
            curError = { ...curError, [field]: requiredMsg };
            invalid = true;
         } else if (error[field]) invalid = true;
      }

      setError({ ...error, ...curError });
      if (invalid) return;

      await submit(values);
   }

   const value = {
      error,
      setError,
      checkRequired,
      checkLength,
      checkEmail,
      checkConfirmPw,
      checkUsernameExists,
      handleSubmit,
   }

   return (
      <ValidationContext.Provider value={value}>
         {children}
      </ValidationContext.Provider>
   )
}

export default ValidationProvider;