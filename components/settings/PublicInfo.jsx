import { useState } from "react";
import { useAuth } from "../../hooks";
import TextField from "../common/TextField";
import ProfileImg from "../common/ProfileImg";

const PublicInfo = ({ updateUser }) => {
	const { authUser } = useAuth();
	const [values, setValues] = useState(authUser);
	const [error, setError] = useState({});

	return (
		<section className="col-start-2">
			<h1 className="text-3xl font-medium">Public profile</h1>
			<h2 className="mt-2">
				People visiting your profile will see the following info
			</h2>

			<form className="mt-5">
				<div className="mt-2">
					<span className="ml-2 block text-xs mb-1 font-light">
						Profile image
					</span>

					<ProfileImg
						profileUrl={authUser.profileUrl}
						name={authUser.name}
						size={20}
					/>
				</div>

				<div className="mt-2">
					<TextField
						name="name"
						label="Name"
						type="text"
						defaultVal={values.name}
						handleBlur={() => {}}
						handleChange={() => {}}
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
					/>
				</div>

				<div className="mt-2 relative">
					<TextField
						name="username"
						label="Username"
						type="text"
						defaultVal={values.username}
						handleBlur={() => {}}
						handleChange={() => {}}
						handleFocus={() => {}}
					/>
					<span className="absolute text-xs text-dark-gray font-light ml-2 -translate-y-3">
						http://localhost:3000/{values.username}
					</span>
				</div>
			</form>
		</section>
	);
};

export default PublicInfo;
