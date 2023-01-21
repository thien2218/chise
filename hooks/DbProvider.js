import { useContext, createContext } from "react";
import { Firestore, Auth, Storage } from "../services";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
	const { authUser, setAuthUser } = useAuth();
	const { setAuthError, checkUserExists } = useValidation();

	// -----------USER-----------
	const createUser = async ({ profileUrl, username, name, about }) => {
		const displayName = name + "@" + username;
		const emailAsUsername = authUser.username === username;

		if (emailAsUsername || !(await checkUserExists(username))) {
			const updatedUser = await Auth.updateUser(displayName, profileUrl);
			setAuthUser({ ...updatedUser, isNewUser: true });

			await Firestore.createUser({ ...updatedUser, about });
		} else {
			setAuthError({
				invalid: "This username has already existed",
			});
		}
	};

	const updateUser = async (id, values) => {
		if (
			authUser.username !== values.username ||
			authUser.name !== values.name ||
			authUser.profileUrl !== values.profileUrl
		) {
			const combinedName = values.name + "@" + values.username;
			const { email, emailVerified, ...rest } = await Auth.updateUser(
				combinedName,
				values.profileUrl
			);
			await Firestore.updateCreator(id, { creator: rest });
		}

		await Firestore.updateUser(id, values);
	};

	const updateFollowList = async (userId, pinId, containsUser) => {
		await Firestore.updateFollowList(userId, pinId, containsUser);
	};

	// const deleteUser = async (username) => {
	// 	await Firestore.deleteUser(username);
	// };

	// -----------PIN-----------
	const createPin = async (values) => {
		const { emailVerified, email, ...creator } = authUser;
		const createdAt = new Date().getTime();

		await Firestore.createPin({
			creator,
			createdAt,
			...values,
		});
	};

	const updatePin = async (id, { imgFile, ...values }) => {
		await Firestore.updatePin(id, values);
	};

	const updateSavedByList = async (userId, pinId, containsUser) => {
		await Firestore.updateSavedByList(userId, pinId, containsUser);
	};

	const deletePin = async (id) => {
		await Firestore.deletePin(id);
	};

	// -----------STORAGE-----------
	const uploadImg = async (imgFile, folder) => {
		return await Storage.uploadImg(imgFile, folder);
	};

   const downloadImg = (imgUrl) => {
		const xhr = new XMLHttpRequest();

		xhr.responseType = "blob";
		xhr.onload = (event) => {
			const blob = xhr.response;
         const time = new Date().getTime();
         const fileName = `pin_image${time}.webp`;
         const file = new File([blob], fileName, { type: blob.type });

         const url = URL.createObjectURL(file);
         const a = document.createElement("a");
         a.href = url;
         a.download = file.name;
         a.click();
         a.remove();
		};

		xhr.open("GET", imgUrl);
		xhr.send();
	};

	const value = {
		createPin,
		createUser,
		updateUser,
		updateFollowList,
		updatePin,
		updateSavedByList,
		deletePin,
		uploadImg,
      downloadImg,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbProvider;
