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

	// USER
	const addUser = async ({ username, name, profileUrl, imgFile, ...about }) => {
		const displayName = name + "@" + username;
		const emailAsUsername = authUser.username == username;

      const newProfileUrl = imgFile
			? await Storage.uploadImage(imgFile, "profile")
			: profileUrl || "";

		if (emailAsUsername || !(await checkUsernameExists(username))) {
			const updatedUser = await Auth.updateUser(displayName, newProfileUrl);
			setAuthUser({ ...updatedUser, isNewUser: true });

			const values = {
				...updatedUser,
				...about,
				followers: [],
				following: 0,
				private: {
					gender: "male",
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
		await Firestore.updateUser(username, values);
	};

   const deleteUser = async (username) => {
      await Firestore.deleteUser(username);
   }

	// PIN
	const addPin = async (imgFile, values) => {
		const { emailVerified, email, ...creator } = authUser;
		const imgUrl = await Storage.uploadImage(imgFile, "pin");
		await Firestore.createPin({ creator, imgUrl, ...values });
	};

	const updatePin = async (id, values, imgFile) => {
		if (imgFile) {
			values.imgUrl = await Storage.uploadImage(imgFile, "pin");
		}
		await Firestore.updatePin(id, values);
	};

   const deletePin = async (id) => {
      await Firestore.deletePin(id);
   }

	// OTHER
	const updateList = async (username, containsUser, req) => {
		await Firestore.updateList(username, containsUser, req.col, req.id);
	};

	const value = {
		addPin,
		addUser,
      updateUser,
      deleteUser,
		updatePin,
      deletePin,
		getCurDate,
		updateList,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbProvider;
