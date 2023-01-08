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
	const { setError, shortenEmailRegex } = useValidation();
   const router = useRouter();

	const login = async ({ email, password }) => {
		const { error } = await Auth.login(email, password);
		setFormLoading(true);
		if (error) setError(error);
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		setFormLoading(true);

		if (error) {
			setError(error);
		} else {
			const username = "@" + email.match(shortenEmailRegex)[0];
			const updatedUser = await Auth.updateUser(username, "");
			setAuthUser(updatedUser);
		}
	};

	const loginWithGoogle = async () => {
		const { user, isNewUser, error } = await Auth.loginWithGoogle();
		const curUsername = user?.email.match(shortenEmailRegex)[0];

		if (error) {
			setError(error);
		} else if (isNewUser && !(await Firestore.usernameExists(curUsername))) {
			setLoading(true);
			const combinedName = user?.displayName + "@" + curUsername;
			const updatedUser = await Auth.updateUser(combinedName);

			setAuthUser(updatedUser);
			setLoading(false);
         const values = {
				...updatedUser,
				followers: [],
				following: 0,
				private: {
					gender: "male",
					country: "United States of America",
					birthday: getCurDate(),
				},
			};
			await Firestore.createUser(updatedUser.username, values);
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
