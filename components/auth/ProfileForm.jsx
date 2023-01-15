import { useEffect, useState } from "react";
import TextField from "../common/TextField";
import { useAuth, useValidation, useDb } from "../../hooks";
import ProfileCopy from "./ProfileCopy";
import ProfileUpload from "./ProfileUpload";
import UploadImg from "../common/UploadImg";

const ProfileForm = ({ fields, msgs }) => {
	const {
		logout,
		authUser: { username, name, profileUrl },
	} = useAuth();
	const required = fields.map((field) => field.name);
   const { addUser } = useDb();

	const [img, setImg] = useState({});
	const [values, setValues] = useState({});

	useEffect(() => {
		setValues({ username, name, profileUrl });
	}, [username, name, profileUrl]);

	const {
		authError,
		setAuthError,
		checkLength,
		checkUsername,
		checkName,
		isValid,
		handleSubmit,
	} = useValidation();

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

		if (name == "username") {
			isValid(name, checkUsername(value), msgs[name].textDigitOnly);
			isValid(name, checkLength(value, 3, 20), msgs[name].lengthBetween);
		} else if (name == "name") {
			isValid(name, checkName(value), msgs[name]);
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
		<form className="relative w-full max-w-sm px-10 pb-8 pt-24 bg-white rounded-2xl shadow-lg">
			<UploadImg
				setImg={setImg}
				selectedImg={ProfileCopy}
				defaultSrc={profileUrl}
			>
				<ProfileUpload name={name} />
			</UploadImg>

			{fields.map((field, id) => (
				<TextField
					key={id}
					{...field}
					defaultVal={values[field.name]}
					error={authError[field.name]}
					handleBlur={handleBlur}
					handleFocus={handleFocus}
					handleChange={handleChange}
				/>
			))}

			<div className="w-full mb-2">
            <label className="ml-2 text-sm pointer-events-none" htmlFor="about">
               About (optional)
            </label>

				<textarea
					name="about"
					id="about"
					className="resize-none h-32 outline-none border-2 border-[#cdcdcd] rounded-2xl py-2 px-4 focus:border-blueish w-full hover:border-[#888888] mt-1"
					placeholder="Tell us more about you"
					onChange={handleChange}
				/>
			</div>

			<div className="mt-2 text-center text-primary text-sm">
				<span>{authError.invalid}</span>
			</div>

			<button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(required, { ...values, imgFile: img.imgFile }, addUser);
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
