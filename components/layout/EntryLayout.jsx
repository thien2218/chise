import React, { useState } from "react";
import Head from "next/head";

const EntryLayout = ({ children, pageName }) => {
   const title = `ChiSe | ${pageName}`;

   const initialState = {
      username: "",
      password: "",
   }

   if (pageName == "Sign Up") {
      initialState.email = "";
      initialState.password_confirmation = "";
   }

	const [formValues, setFormValues] = useState(initialState);
	const [message, setMessage] = useState(initialState);
	const emailRegex =
		/[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

   const messages = {
      required: "This field is required",
      username: "Username must contain between 3-20 characters",
      email: "Invalid email pattern",
      password: "Password must contain between 8-20 characters",
      password_confirmation: "Two passwords don't match each other",
      existed: "This username has already been taken",
   };

   const handleBlur = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setFormValues({ ...formValues, [name]: value });

      if (!value) {
         setMessage({ ...message, [name]: messages.required });
         return;
      }

      const logic1 =
         name == "username" && (value.length < 3 || value.length > 20);
      const logic2 =
         name == "password" && (value.length < 8 || value.length > 20);
      const logic3 =
         name == "email" &&
         (value.match(emailRegex) == null ||
            value.match(emailRegex)[0] != value);

      if (logic1 || logic2 || logic3)
         setMessage({ ...message, [name]: messages[name] });
   };

   const handleFocus = (e) => {
      const name = e.target.name;
      setMessage({ ...message, [name]: "" })
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const msgCurrentState = {};
      let invalid = false;

      for (const prop in formValues) {
         if (!formValues[prop]) {
            msgCurrentState[prop] = messages.required;
            invalid = true;
         } else if (message[prop]) invalid = true;
      }
      
      setMessage({ ...message, ...msgCurrentState });
      if (invalid) return;

      console.log("Passed!");
   }
      
	return (
      <>
         <Head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
         </Head>

         <div className="h-screen w-screen relative">
            <video
               src='/assets/chise.mp4'
               type="video/mp4"
               loop
               controls={false}
               autoPlay
               muted
               className="w-full h-full object-cover"
            />

            <div className="absolute top-0 right-0 left-0 bottom-0 grid laptop:grid-cols-2 bg-black-overlay">
               <div className="flex justify-center items-center">
                  <h1 className="text-[4rem] leading-[5rem] font-semibold text-white max-w-[26rem] laptop:text-left text-center">
                     New ideas made to be shared
                  </h1>
               </div>
               <div className="flex justify-center items-center">
                  {React.cloneElement(children, { handleBlur, handleFocus, handleSubmit, formValues, message })}
               </div>
            </div>
         </div>
      </>
   );
};

export default EntryLayout;
