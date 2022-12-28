import { useEffect, useState } from "react";
import TextField from "../common/TextField";
import { useAuth, useDb, useValidation } from "../../hooks";
import ProfileCopy from "./ProfileCopy";
import ProfileUpload from "./ProfileUpload";

const ProfileForm = ({ fields, submit, msgs }) => {
	const {
		logout,
		authUser: { username, name, profileUrl },
	} = useAuth();
	const { compressImg } = useDb();

	const required = fields
		.filter((field) => !field.optional)
		.map((field) => field.name);

	const [imgFile, setImgFile] = useState(null);
	const [imgSrc, setImgSrc] = useState(profileUrl);
	const [values, setValues] = useState({});

	useEffect(() => {
		setValues({ username, name, profileUrl, about: "" });
	}, [username, name, profileUrl]);

	const handlePreview = (e) => {
		const file = e.target.files[0];
		compressImg(file, 200, "profile", setImgSrc, setImgFile, setValues);
	};

	const handleDeleteImg = (e) => {
		e.preventDefault();
		setImgFile(null);
		setImgSrc(null);
	};

	const {
		error,
		setError,
		checkLength,
		checkUsername,
		checkName,
		isValid,
		handleSubmit,
	} = useValidation();

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
		} else if (name == "name") {
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
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form className="relative w-full max-w-sm px-10 pb-8 pt-24 bg-white rounded-2xl shadow-lg">
			{imgSrc ? (
				<ProfileCopy
					handlePreview={handlePreview}
					handleDeleteImg={handleDeleteImg}
					imgSrc={imgSrc}
				/>
			) : (
				<ProfileUpload handlePreview={handlePreview} username={username} />
			)}

			{fields.map((field, id) => (
				<TextField
					key={id}
					{...field}
					defaultValue={values[field.name]}
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
					handleSubmit(required, { ...values, imgFile }, submit);
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
