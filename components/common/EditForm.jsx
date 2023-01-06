import { useState } from "react";
import Button from "./Button";
import AdjustedImg from "./AdjustedImg";
import { IoArrowUpCircle } from "react-icons/io5";
import { useValidation, useDb } from "../../hooks";
import UploadImg from "./UploadImg";
import { useRouter } from "next/router";
import _ from "lodash";
import Dropdown from "../headlessui/Dropdown";

const EditField = ({ children, label, htmlFor }) => {
	return (
		<div className="py-3 px-4 grid md:grid-cols-[1fr_3fr] grid-cols-1 md:gap-4 gap-2">
			<label className="text-sm h-min" htmlFor={htmlFor}>
				{label}
			</label>
			{children}
		</div>
	);
};

const EditImgField = ({ imgRatio, imgSrc, handlePreview }) => {
	return (
		<AdjustedImg ratio={imgRatio} src={imgSrc} scale={1}>
			<div className="relative w-full h-full overflow-hidden bg-black/40 opacity-0 hover:opacity-100 p-4">
				<div className="rounded-lg h-full w-full border-dashed border-white border-[2px] flex-center flex-col text-center text-white gap-2 cursor-pointer">
					<IoArrowUpCircle className="text-3xl" />
					<span>Change image</span>
				</div>

				<input
					type="file"
					name="pinImg"
					id="pinImg"
					className="absolute left-0 -top-1/2 h-[150%] w-full cursor-pointer opacity-0"
					accept=".jpg,.png,.webp,.jpeg"
					onChange={handlePreview}
				/>
			</div>
		</AdjustedImg>
	);
};

const EditForm = ({ setEdit, edit }) => {
	const { id, ...otherValues } = edit;
	const [values, setValues] = useState(otherValues);
	const [imgFile, setImgFile] = useState(null);
	const [error, setError] = useState({});

	const { checkLength, checkUrl } = useValidation();
	const { updatePin, deletePin } = useDb();
	const { replace, asPath } = useRouter();

	const options = [
		{
			label: "Disabled",
			value: true,
		},
		{
			label: "Enabled",
			value: false,
		},
	];
	const defaultVal = options.filter(
		(option) => option.value === edit.cmtDisabled
	)[0];

	const handleChange = (e) => {
		const { value, name } = e.target;

		if (name == "title" && checkLength(value.trim(), 0, 100)) {
			setError({
				...error,
				title: "Title can only contain less than 100 characters",
			});
		} else if (name == "description" && checkLength(value.trim(), 0, 750)) {
			setError({
				...error,
				description:
					"Description can only contain less than 750 characters",
			});
		} else if (name == "link" && checkUrl(value)) {
			setError({
				...error,
				link: "Invalid destination link",
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

	const handleSubmit = async () => {
		if (Object.keys(error).length === 0 || _.isEqual(otherValues, values)) {
         setEdit(null);
         return;
      }

		await updatePin(id, values, imgFile);
		setEdit(null);
		replace(asPath);
	};

	return (
		<form className="fixed overflow-y-scroll top-0 w-full h-full flex items-center z-20">
			<div
				onClick={() => setEdit(null)}
				className="absolute z-30 h-full w-full"
			></div>

			<div className="px-4 mx-auto w-full max-w-[56rem]">
				<div className="relative z-40 rounded-2xl bg-white shadow-[rgb(0_0_0_/_50%)_0_0_0_9000px]">
					<h1 className="text-[1.75rem] font-medium text-center p-6">
						Edit this pin
					</h1>

					<div className="px-4 grid xs:grid-cols-[1fr_17.5rem] grid-cols-1">
						<div className="row-start-2 xs:row-start-1">
							<EditField label="Title" htmlFor="title">
								<div className="w-full">
									<input
										type="text"
										name="title"
										id="title"
										className="w-full border-b-[1.5px] outline-none pb-1 text-xl focus:border-blueish"
										style={{
											borderColor: `${
												error.title ? "var(--clr-primary)" : ""
											}`,
										}}
										placeholder="Add a title"
										value={values.title}
										onChange={handleChange}
									/>
									<span className="text-primary text-xs">
										{error.title}
									</span>
								</div>
							</EditField>

							<EditField label="Destination link" htmlFor="link">
								<div className="w-full">
									<input
										type="text"
										name="link"
										id="link"
										className="w-full border-b-[1.5px] outline-none pb-1 focus:border-blueish"
										style={{
											borderColor: `${
												error.link ? "var(--clr-primary)" : ""
											}`,
										}}
										placeholder="Add a destination link"
										value={values.link}
										onChange={handleChange}
									/>
									<span className="text-primary text-xs">
										{error.link}
									</span>
								</div>
							</EditField>

							<EditField label="Description" htmlFor="description">
								<div className="w-full">
									<textarea
										name="description"
										id="description"
										className="resize-none h-56 outline-none border-[1.5px] rounded-lg py-1 px-2 focus:border-blueish w-full"
										style={{
											borderColor: `${
												error.description
													? "var(--clr-primary)"
													: ""
											}`,
										}}
										placeholder="Add a description"
										value={values.description}
										onChange={handleChange}
									/>
									<span className="text-primary text-xs">
										{error.description}
									</span>
								</div>
							</EditField>

							<EditField label="Comment" htmlFor="cmtDisabled">
								<div className="w-full relative">
									<Dropdown
										handleChange={handleChange}
										options={options}
										name="cmtDisabled"
										defaultVal={defaultVal}
									/>
								</div>
							</EditField>
						</div>

						<div className="py-3 px-4 row-start-1">
							<UploadImg
								setImgFile={setImgFile}
								setValues={setValues}
								imgRatio={values.imgRatio}
								defaultSrc={values.imgUrl}
								selectedImg={EditImgField}
							>
								<EditImgField
									imgRatio={edit.imgRatio}
									imgSrc={edit.imgUrl}
								/>
							</UploadImg>
						</div>
					</div>

					<div className="flex justify-between p-6">
						<Button btnType="secondary-btn" onClick={() => deletePin(id)}>
							Delete
						</Button>

						<div className="flex gap-3">
							<Button
								btnType="secondary-btn"
								onClick={() => setEdit(null)}
							>
								Cancel
							</Button>
							<Button btnType="primary-btn" onClick={handleSubmit}>
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default EditForm;
