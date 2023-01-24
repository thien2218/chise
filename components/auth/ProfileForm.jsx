import { useEffect, useState } from "react";
import TextField from "../common/TextField";
import { useAuth, useValidation, useDb } from "../../hooks";
import { ProfileDefault, ProfileSelected } from "./ProfileUpload";
import UploadImg from "../common/UploadImg";
import { useLayout } from "../common/Layout";

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
	const { isProcessing, setIsProcessing } = useLayout();

	useEffect(() => {
		const { username, name, profileUrl } = authUser;
		setValues({ username, name, profileUrl });
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

		if (name === "username") {
			authValid(name, checkUsername(value), msgs[name].textDigitOnly);
			authValid(name, checkLength(value, 3, 20), msgs[name].lengthBetween);
		} else if (name === "name") {
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
		let newProfileUrl = profileUrl;
		let profilePath = "";

		if (imgFile) {
			const { downloadUrl, path } = await uploadImg(imgFile, "profile");
			newProfileUrl = downloadUrl;
			profilePath = path;
		}

		await createUser({ ...values, profilePath, profileUrl: newProfileUrl });
	};

	return (
		<form
			className={`relative w-full max-w-sm pb-8 pt-20 px-10 bg-white rounded-2xl shadow-lg ${
				isProcessing ? "pointer-events-none select-none" : ""
			}`}
		>
			<div
				className={`absolute h-full w-full top-0 left-0 bg-gray-400/40 pointer-events-none rounded-2xl ${
					isProcessing ? "opacity-100" : "opacity-0"
				}`}
			/>

			<UploadImg
				imgUrl={values.profileUrl}
				setValues={setValues}
				selectedImg={ProfileSelected}
			>
				<ProfileDefault username={values.username} />
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
				<label className="text-sm pointer-events-none" htmlFor="about">
					About (optional)
				</label>

				<textarea
					name="about"
					id="about"
					className="resize-none h-32 outline-none border-2 border-gray-300 rounded-2xl py-2 px-4 focus:border-blue-500 w-full hover:border-gray-400 mt-1"
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
					setIsProcessing(true);

					handleSubmit(required, values, submit).then(() => {
						setIsProcessing(false);
					});
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
