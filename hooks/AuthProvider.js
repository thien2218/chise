import { useState, useContext, createContext } from "react";
import { Firestore, Auth } from "../services";
import { useValidation } from "./ValidationProvider";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const { setError, shortenEmailRegex } = useValidation();

	const login = async ({ email, password }) => {
		const { error } = await Auth.login(email, password);
		if (error) setError(error);
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		if (error) { setError(error)}
      else {
         const username = "@" + email.match(shortenEmailRegex)[0];
         const updatedUser = await Auth.updateUser(username, "");
         setAuthUser(updatedUser);
      }
	};

	const loginWithGoogle = async () => {
      // 2 cases:
      //    Username already exists:
      //       TODO
      //    Username doesn't exist:
      //       Concat the current display name with shorten email
      //       Create the user

		const {
			user: { username, ...otherData },
			isNewUser,
			error,
		} = await Auth.loginWithGoogle();

		if (error) {
			setError(error);
		} else if (isNewUser) {
			if (!(await Firestore.usernameExists(username))) {
				const updatedUser = await Auth.updateUsername("");
				setAuthUser(updatedUser);
			} else {
				await Firestore.createUser(username, otherData);
			}
		}
	};

	const logout = async () => {
		await Auth.logout();
	};

	const value = {
		authUser,
		setAuthUser,
		login,
		signup,
		loginWithGoogle,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
