import { useEffect, useState } from "react";
import TextField from "../common/TextField";
import { useAuth, useValidation, useDb } from "../../hooks";
import ProfileCopy from "./ProfileCopy";
import ProfileUpload from "./ProfileUpload";
import UploadImg from "../common/UploadImg";

const ProfileForm = ({ fields }) => {
	const msgs = {
		username: {
			lengthBetween: "Username can only have between 3 to 20 characters",
			textDigitOnly: "Username can only contain text or digits",
		},
		name: {
			exceptSpecialSet:
				"Name mustn't contain any of these characters: @#$^*-+=|\"`\\<>[]{}",
			lengthBetween: "Name must be at least 3 characters, max 100",
		},
	};

	const { logout, authUser } = useAuth();
	const required = fields.map((field) => field.name);
	const [values, setValues] = useState({});
	const { createUser, uploadImg } = useDb();

	useEffect(() => {
		const { username, name, profileUrl } = authUser;
		setValues({ username, name, profileUrl, about: "" });
	}, [authUser]);

	const {
		authError,
		setAuthError,
		checkLength,
		checkUsername,
		checkName,
		authValid,
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
			authValid(name, checkUsername(value), msgs[name].textDigitOnly);
			authValid(name, checkLength(value, 3, 20), msgs[name].lengthBetween);
		} else if (name == "name") {
			authValid(name, checkName(value), msgs[name].exceptSpecialSet);
			authValid(name, checkLength(value, 3, 100), msgs[name].lengthBetween);
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

	const submit = async ({ imgFile, profileUrl, imgRatio, ...values }) => {
		const newProfileUrl = imgFile
			? await uploadImg(imgFile, "profile")
			: profileUrl;

		await createUser({ ...values, profileUrl: newProfileUrl });
	};

	return (
		<form className="relative w-full max-w-sm px-10 pb-8 pt-24 bg-white rounded-2xl shadow-lg">
			<UploadImg
				setValues={setValues}
				selectedImg={ProfileCopy}
				defaultSrc={authUser.profileUrl}
			>
				<ProfileUpload username={authUser.username} />
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
					handleSubmit(required, values, submit);
				}}
				className="primary-btn btn-transition w-full py-2 px-4 rounded-2xl mt-2"
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
