import { useState, useContext, createContext } from "react";
import { Firestore, Auth } from "../services";
import { useValidation } from "./ValidationProvider";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { setError, shortenEmailRegex } = useValidation();

	const login = async ({ email, password }) => {
		const { error } = await Auth.login(email, password);
		if (error) setError(error);
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		if (error) {
			setError(error);
		} else {
			const username = "@" + email.match(shortenEmailRegex)[0];
			const updatedUser = await Auth.updateUser(username, "");
			setAuthUser(updatedUser);
		}
	};

	const loginWithGoogle = async () => {
		const {
			user,
			isNewUser,
			error,
		} = await Auth.loginWithGoogle();

      setLoading(true);
		const curUsername = user?.email.match(shortenEmailRegex)[0];

		if (error) {
			setError(error);
		} else if (isNewUser && !(await Firestore.usernameExists(curUsername))) {
			const combinedName = user?.displayName + "@" + curUsername;
			const { username, ...otherData } = await Auth.updateUser(combinedName);
			setAuthUser({ username, ...otherData });
         setLoading(false);
         await Firestore.createUser(username, otherData);
		} else {
         setLoading(false);
      }
	};

	const logout = async () => {
		await Auth.logout();
	};

	const value = {
		authUser,
      loading,
		setAuthUser,
      setLoading,
		login,
		signup,
		loginWithGoogle,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
