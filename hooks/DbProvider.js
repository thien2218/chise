import { useContext, createContext } from "react";
import { Firestore, Auth, Storage } from "../services";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";
import { useLib } from "./LibProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
	const { authUser, setAuthUser } = useAuth();
	const { setAuthError, checkUsernameExists } = useValidation();
	const { getCurDate } = useLib();

	// -----------USER-----------
	const addUser = async ({ profileUrl, username, name, about }) => {
		const displayName = name + "@" + username;
		const emailAsUsername = authUser.username === username;

		if (emailAsUsername || !(await checkUsernameExists(username))) {
			const updatedUser = await Auth.updateUser(displayName, profileUrl);
			setAuthUser({ ...updatedUser, isNewUser: true });

			const values = {
            name: updatedUser.name,
				profileUrl: updatedUser.profileUrl,
				about,
				followers: [],
				following: [],
				privateInfo: {
					gender: "Male",
					country: "United States of America",
					birthday: getCurDate(),
				},
			};

			await Firestore.createUser(username, values);
		} else {
			setAuthError({
				invalid: "This username has already existed",
			});
		}
	};

	const updateUser = async (username, values) => {
      if (authUser.username !== username) {
         await Firestore.deleteUser(authUser.username);

         const combinedName = values.name + "@" + username;
         await Auth.updateUser(combinedName, values.profileUrl);

         await Firestore.createUser(username, values);
      } else {
         await Firestore.updateUser(authUser.username, values);
      }
	};

	const updateFollowList = async (username, id, containsUser) => {
		await Firestore.updateFollowList(username, id, containsUser);
	};

	const deleteUser = async (username) => {
		await Firestore.deleteUser(username);
	};

	// -----------PIN-----------
	const addPin = async (values) => {
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

	const updateSavedByList = async (username, id, containsUser) => {
		await Firestore.updateSavedByList(username, id, containsUser);
	};

	const deletePin = async (id) => {
		await Firestore.deletePin(id);
	};

	// -----------STORAGE-----------
	const uploadImg = async (imgFile, col) => {
		return await Storage.uploadImg(imgFile, col);
	};

	const value = {
		addPin,
		addUser,
		updateUser,
		updateFollowList,
		deleteUser,
		updatePin,
		updateSavedByList,
		deletePin,
		uploadImg,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbProvider;
