import { useState, useEffect } from "react";
import { useAuth, useValidation } from "../../hooks";
import TextField from "../common/TextField";
import ProfileImg from "../common/ProfileImg";

const PublicInfo = ({ values, setValues }) => {
	const { authUser } = useAuth();
	const [error, setError] = useState({});
	const { checkUsername, checkName, checkUsernameExists } = useValidation();

   useEffect(() => {
      setValues(authUser);
   }, []);

	const handleChange = (e) => {
		const { value, name } = e.target;

		if (name == "name" && checkName(value)) {
			setError({
				...error,
				name: "Name mustn't contain any of these characters: @#$^*-+=|\"`\\<>[]{}",
			});
		} else if (name == "username" && checkUsername(value)) {
			setError({
				...error,
				username:
					"Username cannot contain any white spaces or special characters",
			});
		}

		setValues({
			...values,
			[name]: value,
		});
	};

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-medium">Public profile</h1>
			<h2 className="mt-2 text-dark-gray">
				People visiting your profile will see the following info
			</h2>

			<form className="mt-5">
				<div className="mt-2">
					<label className="ml-2 block text-xs mb-1 font-light">
						Profile image
					</label>

					<div className="flex items-center gap-4">
						<ProfileImg
							profileUrl={authUser.profileUrl}
							name={authUser.name}
							size={20}
						/>

						<button className="py-2 px-3 font-medium rounded-full secondary-btn">
							Change
						</button>
					</div>
				</div>

				<div className="mt-2">
					<TextField
						name="name"
						label="Name"
						type="text"
						error={error.name}
						defaultVal={values.name}
						handleBlur={() => {}}
						handleChange={handleChange}
						handleFocus={() => {}}
					/>
				</div>

				<div className="mt-2">
					<label className="ml-2 text-xs font-light" htmlFor="about">
						About
					</label>

					<textarea
						name="about"
						id="about"
						className="resize-none h-32 outline-none border-2 border-[#cdcdcd] rounded-2xl py-2 px-4 focus:border-blueish w-full hover:border-[#888888] mt-1"
						placeholder="Tell us your story"
						value={values.about}
						onChange={handleChange}
					/>
				</div>

				<div className="mt-2 relative">
					<TextField
						name="username"
						label="Username"
						type="text"
						error={error.username}
						defaultVal={values.username}
						handleBlur={() => {}}
						handleChange={handleChange}
						handleFocus={() => {}}
					/>
					<span className="absolute text-xs text-dark-gray font-light ml-2 -translate-y-3">
						http://localhost:3000/{values.username}
					</span>
				</div>
			</form>
		</div>
	);
};

export default PublicInfo;
