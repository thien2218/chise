import { useState, useRef } from "react";
import { TbUpload } from "react-icons/tb";
import Button from "../common/Button";
import UploadImg from "../common/UploadImg";
import ProfileImg from "../common/ProfileImg";
import { useAuth, useDb } from "../../hooks";

const Placeholder = ({ setIsOpen, handlePreview }) => {
	const inputRef = useRef();

	return (
		<>
			<div className="text-dimmed-700 text-8xl w-full py-6 flex-center">
				<TbUpload />
			</div>

			<div className="relative grid grid-cols-2 gap-3">
				<Button
					btnType="secondary-btn"
					onClick={() => setIsOpen(false)}
					noAsync
				>
					Cancel
				</Button>

				<Button
					btnType="primary-btn"
					onClick={() => inputRef.current.click()}
					noAsync
				>
					Choose image
				</Button>

				<input
					ref={inputRef}
					type="file"
					id="profileUrl"
					className="hidden"
					accept=".jpg,.png,.webp,.jpeg"
					onChange={handlePreview}
				/>
			</div>
		</>
	);
};

const SelectedImg = ({ imgUrl, updateProfile, unselectImg }) => {
	return (
		<>
			<div className="flex-center py-6">
				<ProfileImg profileUrl={imgUrl} size={24} />
			</div>

			<div className="relative grid grid-cols-2 gap-3">
				<button
					id="profileUrl"
					className="secondary-btn py-3 rounded-full"
					onClick={unselectImg}
				>
					Remove
				</button>

				<Button btnType="primary-btn" onClick={updateProfile}>
					Upload
				</Button>
			</div>
		</>
	);
};

const UploadModal = ({ setIsOpen, setValues, setInitObj, profilePath }) => {
	const [img, setImg] = useState({});
	const { updateUser, uploadImg, deleteImg } = useDb();
	const { authUser } = useAuth();

	const updateProfile = async () => {
		const { downloadUrl, path } = await uploadImg(img.imgFile, "profile");
		const { id, ...user } = authUser;
      const values = {
			...user,
			profileUrl: downloadUrl,
			profilePath: path,
      }

      setValues((prev) => ({
         ...prev,
         ...values,
      }));
      setInitObj((prev) => ({
         ...prev,
         ...values,
      }));

		await updateUser(id, values);
		setIsOpen(false);
		if (profilePath) await deleteImg(profilePath);
	};

	return (
		<UploadImg
			setValues={setImg}
			imgUrl={img.profileUrl}
			selectedImg={SelectedImg}
			customProps={{ updateProfile }}
		>
			<Placeholder setIsOpen={setIsOpen} />
		</UploadImg>
	);
};

export default UploadModal;
