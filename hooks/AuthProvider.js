import { useState, useContext, createContext } from "react";
import { Firestore, Auth } from "../services";
import { useValidation } from "./ValidationProvider";
import { useRouter } from "next/router";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formLoading, setFormLoading] = useState(false);
	const { setAuthError, checkUserExists } = useValidation();
   const router = useRouter();
   const emailShortRegex = /^.*?(?=@)/;

	const login = async ({ email, password }) => {
		const { error } = await Auth.login(email, password);
		setFormLoading(true);
		if (error) setAuthError(error);
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		setFormLoading(true);

		if (error) {
			setAuthError(error);
		} else {
			const username = "@" + email.match(emailShortRegex)[0];
			const updatedUser = await Auth.updateUser(username, "");
			setAuthUser(updatedUser);
		}
	};

	const loginWithGoogle = async () => {
		const { user, isNewUser, error } = await Auth.loginWithGoogle();
		const curUsername = user?.email.match(emailShortRegex)[0];

		if (error) {
			setAuthError(error);
		} else if (isNewUser && !(await checkUserExists(curUsername))) {
			setLoading(true);
         const profileUrl = user.photoUrl ?? "";
         const combinedName = user.displayName + "@" + curUsername;
			const updatedUser = await Auth.updateUser(combinedName, profileUrl);

			setAuthUser({ ...updatedUser, isNewUser });
			setLoading(false);

			await Firestore.createUser(updatedUser);
		}
	};

	const logout = async () => {
		await Auth.logout();
      router.reload();
	};

	const value = {
		authUser,
		formLoading,
		loading,
		setAuthUser,
		setFormLoading,
		setLoading,
		login,
		signup,
		loginWithGoogle,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
