import { useContext, createContext } from "react";
import { Firestore, Auth, Storage } from "../services";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
	const { authUser, setAuthUser } = useAuth();
	const { setError } = useValidation();

   // USER
	const addPin = async (imgFile, values) => {
		const { id, emailVerified, ...author } = authUser;
		const imgUrl = await Storage.uploadImage(imgFile, "pin");
		return await Firestore.createPin({ author, imgUrl, ...values });
	};

	const addUser = async ({ username, name, about, profileUrl, imgFile }) => {
		const { username: prevUsername } = authUser;
		const displayName = name + "@" + username;
		const emailAsUsername = prevUsername == username;
		const newProfileUrl = imgFile
			? await Storage.uploadImage(imgFile, "profile")
			: profileUrl || "";

		if (emailAsUsername || !(await Firestore.usernameExists(username))) {
			const updatedUser = await Auth.updateUser(displayName, newProfileUrl);
			setAuthUser(updatedUser);
			await Firestore.createUser(username, {
            ...updatedUser,
            about,
				followers: [],
				following: 0,
			});
		} else {
			setError({
				invalid: "This username has already existed",
			});
		}
	};

   // PIN
   const updatePin = async (id, values) => {
      await Firestore.updatePin(id, values);
   }

   // OTHER
	const updateList = async (username, containsUser, req) => {
		await Firestore.updateList(username, containsUser, req.col, req.id);
	};

	const value = {
		addPin,
		addUser,
      updatePin,
		updateList,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbProvider;
