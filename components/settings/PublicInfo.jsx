import { useEffect } from "react";
import { useValidation } from "../../hooks";
import TextField from "../common/TextField";
import ProfileImg from "../common/ProfileImg";
import UploadImg from "../common/UploadImg";
import { ImArrowRight2 } from "react-icons/im";
import { IoTrashBin } from "react-icons/io5";

const ChangeBtn = ({ handlePreview }) => {
	return (
		<div className="relative py-2 px-3 font-medium rounded-full secondary-btn overflow-hidden">
			Change
			<input
				type="file"
				className="opacity-0 h-[150%] w-full absolute left-0 cursor-pointer -translate-y-[50%]"
				onChange={handlePreview}
			/>
		</div>
	);
};

const SelectedImg = ({ imgSrc, unselectImg }) => {
	return (
		<>
			<ImArrowRight2 className="text-xl" />
			<div className="relative">
				<ProfileImg profileUrl={imgSrc} size={20} />
				<button
					onClick={unselectImg}
					className="absolute p-2 bg-dimmed-500 flex-center rounded-full -top-1 -right-1"
				>
					<IoTrashBin className="text-sm" />
				</button>
			</div>
		</>
	);
};

const PublicInfo = ({
   info,
	values,
	setValues,
   setInitObj,
	error,
	setError,
}) => {
	const { checkUsername, checkName, checkLength } = useValidation();

   useEffect(() => {
      setValues(info);
      setInitObj(info);
   }, []);

	const handleChange = (e) => {
		const { value, name } = e.target;

      if (name === "name" && checkName(value)) {
         setError({
            ...error,
            [name]:
               "Name mustn't contain any of these characters: @#$^*-+=|\"`\\<>[]{}",
         });
      } else if (name === "name" && checkLength(value, 3, 100)) {
         setError({
            ...error,
            [name]: "Name must contain at least 3 characters, max 100",
         });
      } else if (name === "username" && checkUsername(value)) {
         setError({
            ...error,
            [name]:
               "Username cannot contain any white space or special character",
         });
      } else if (name === "username" && checkLength(value, 3, 20)) {
         setError({
            ...error,
            [name]: "Username can only have between 3 to 20 characters",
         });
      } else {
         setError({
            ...error,
            [name]: "",
         });
      }

		setValues({
			...values,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const actualVal = value.trim();

		setValues({
			...values,
			[name]: actualVal,
		});
	};

	return (
		<div className="mb-12">
			<h1 className="text-3xl font-medium">Public profile</h1>
			<h2 className="mt-2 mb-5 text-dark-gray">
				People visiting your profile will see the following info
			</h2>

			<form>
				<div className="mt-2">
					<label className="ml-2 block text-xs mb-1 font-light">
						Profile image
					</label>

					<div className="flex items-center gap-4">
						<ProfileImg
							profileUrl={info.profileUrl}
							username={info.username}
							size={20}
						/>

						<UploadImg setValues={setValues} selectedImg={SelectedImg}>
							<ChangeBtn />
						</UploadImg>
					</div>
				</div>

				<div className="mt-2">
					<TextField
						name="name"
						label="Name"
						type="text"
						error={error.name}
						defaultVal={values.name}
						handleBlur={handleBlur}
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
						className="resize-none h-32 outline-none border-2 border-gray-300 rounded-2xl py-2 px-4 focus:border-blue-500 w-full hover:border-gray-400 mt-1"
						placeholder="Tell us your story"
						value={values.about}
						onChange={handleChange}
					/>
				</div>

				<div className="mt-2">
					<TextField
						name="username"
						label="Username"
						type="text"
						error={error.username}
						defaultVal={values.username}
						handleBlur={handleBlur}
						handleChange={handleChange}
						handleFocus={() => {}}
					/>
				</div>
			</form>
		</div>
	);
};

export default PublicInfo;
