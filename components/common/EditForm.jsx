import { useState } from "react";
import Button from "./Button";
import AdjustedImg from "./AdjustedImg";
import { IoArrowUpCircle } from "react-icons/io5";
import { useValidation, useDb, useLib } from "../../hooks";
import UploadImg from "./UploadImg";
import { useRouter } from "next/router";
import Dropdown from "../headlessui/Dropdown";
import Modal from "../headlessui/Modal";
import ModalConfirm from "../settings/ModalConfirm";

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
		<div className="overflow-hidden rounded-lg">
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
		</div>
	);
};

const EditForm = ({ setIsOpen, setCurrPin, id, ...fieldValues }) => {
	const [values, setValues] = useState(fieldValues);
	const [error, setError] = useState({});

	const { checkUrl, checkErrors } = useValidation();
	const { updatePin, deletePin, uploadImg } = useDb();
	const { isEqual } = useLib();
	const router = useRouter();

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
	const currGender = options.filter(
		(option) => option.value === fieldValues.cmtDisabled
	)[0];

	const handleChange = (e) => {
		const { value, name } = e.target;

		if (name == "title" && value.trim().length > 100) {
			setError({
				...error,
				title: "Title can only contain less than 100 characters",
			});
		} else if (name == "description" && value.trim().length > 750) {
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
		if (checkErrors(error) || isEqual(fieldValues, values)) {
			setIsOpen(false);
			return;
		}

		if (values.imgFile) {
			values.imgUrl = await uploadImg(imgFile, "pin");
		}
		const { imgFile, ...neededValues } = values;

		await updatePin(id, neededValues);
      setCurrPin({ id, ...neededValues });
		setIsOpen(false);
	};

	const handleDelete = async () => {
		await deletePin(id);
		router.reload();
	};

	return (
		<>
			<div className="grid xs:grid-cols-[1fr_17.5rem] grid-cols-1">
				<div className="row-start-2 xs:row-start-1">
					<EditField label="Title" htmlFor="title">
						<div className="w-full">
							<input
								type="text"
								name="title"
								id="title"
								className="w-full border-b-[1.5px] outline-none pb-1 text-xl focus:border-blue-500"
								style={{
									borderColor: `${
										error.title ? "var(--clr-primary)" : ""
									}`,
								}}
								placeholder="Add a title"
								value={values.title}
								onChange={handleChange}
							/>
							<span className="text-primary text-xs">{error.title}</span>
						</div>
					</EditField>

					<EditField label="Destination link" htmlFor="link">
						<div className="w-full">
							<input
								type="text"
								name="link"
								id="link"
								className="w-full border-b-[1.5px] outline-none pb-1 focus:border-blue-500"
								style={{
									borderColor: `${
										error.link ? "var(--clr-primary)" : ""
									}`,
								}}
								placeholder="Add a destination link"
								value={values.link}
								onChange={handleChange}
							/>
							<span className="text-primary text-xs">{error.link}</span>
						</div>
					</EditField>

					<EditField label="Description" htmlFor="description">
						<div className="w-full">
							<textarea
								name="description"
								id="description"
								className="resize-none h-52 outline-none border-[1.5px] rounded-lg py-1 px-2 focus:border-blue-500 w-full"
								style={{
									borderColor: `${
										error.description ? "var(--clr-primary)" : ""
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
								defaultVal={currGender}
							/>
						</div>
					</EditField>
				</div>

				<div className="py-3 px-4 row-start-1">
					<UploadImg
						setValues={setValues}
						imgRatio={values.imgRatio}
						selectedImg={EditImgField}
					>
						<EditImgField imgRatio={fieldValues.imgRatio} imgSrc={fieldValues.imgUrl} />
					</UploadImg>
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<Button btnType="secondary-btn" onClick={handleDelete}>
					Delete
				</Button>

				<div className="flex gap-3">
					<Button
						btnType="secondary-btn"
						onClick={() => setIsOpen(false)}
						noAsync
					>
						Cancel
					</Button>

					<Button btnType="primary-btn" onClick={handleSubmit}>
						Save
					</Button>
				</div>
			</div>
		</>
	);
};

export default EditForm;
