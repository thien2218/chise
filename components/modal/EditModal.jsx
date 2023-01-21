import { useState } from "react";
import Button from "../common/Button";
import { EditField, EditImgField } from "./EditComponents";
import { useValidation, useDb, useLib } from "../../hooks";
import UploadImg from "../common/UploadImg";
import { useRouter } from "next/router";
import Dropdown from "../headlessui/Dropdown";
import Modal from "../headlessui/Modal";
import ConfirmDialog from "./ConfirmDialog";


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

		if (name === "title" && value.trim().length > 100) {
			setError({
				...error,
				title: "Title can only contain less than 100 characters",
			});
		} else if (name === "description" && value.trim().length > 750) {
			setError({
				...error,
				description:
					"Description can only contain less than 750 characters",
			});
		} else if (name === "link" && checkUrl(value)) {
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

		setCurrPin({ id, ...neededValues });
		await updatePin(id, neededValues);
		setIsOpen(false);
	};

	const handleDelete = async () => {
		await deletePin(id);
      if (router.pathname === "/pin/[pinId]") {
         router.push("/");
      } else {
         router.reload();
      }
	};

	const deleteModalCustomProps = {
		description:
			"This action cannot be undone. Are you sure you want to proceed?",
		confirmTxt: "Delete",
		cancelTxt: "Cancel",
		handleConfirm: handleDelete,
		noAsync: false,
	};

	return (
		<div className="mt-2">
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
						<EditImgField
							imgRatio={fieldValues.imgRatio}
							imgSrc={fieldValues.imgUrl}
						/>
					</UploadImg>
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<Modal
					title="Delete this pin permanently"
					maxW="max-w-lg"
					customProps={deleteModalCustomProps}
					dialogChild={ConfirmDialog}
				>
					<Button btnType="secondary-btn" onClick={() => {}} noAsync>
						Delete
					</Button>
				</Modal>

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
		</div>
	);
};

const EditModal = (props) => {
   const { children, ...customProps } = props;

	return (
		<Modal
			title="Edit this pin"
			maxW="max-w-[56rem]"
			customProps={customProps}
			dialogChild={EditForm}
		>
			{children}
		</Modal>
	);
};

export default EditModal;
