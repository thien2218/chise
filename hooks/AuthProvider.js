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
	const { setAuthError } = useValidation();
   const router = useRouter();
   const emailShortRegex = /^.*?(?=@)/;

	const login = async ({ email, password }) => {
		const { authError } = await Auth.login(email, password);
		setFormLoading(true);
		if (authError) setAuthError(authError);
	};

	const signup = async ({ email, password }) => {
		const { authError } = await Auth.signup(email, password);
		setFormLoading(true);

		if (authError) {
			setAuthError(authError);
		} else {
			const username = "@" + email.match(emailShortRegex)[0];
			const updatedUser = await Auth.updateUser(username, "");
			setAuthUser(updatedUser);
		}
	};

	const loginWithGoogle = async () => {
		const { user, isNewUser, authError } = await Auth.loginWithGoogle();
		const curUsername = user?.email.match(emailShortRegex)[0];
      const profileUrl = user?.photoUrl ?? "";

		if (authError) {
			setAuthError(authError);
		} else if (isNewUser && !(await Firestore.usernameExists(curUsername))) {
			setLoading(true);
			const combinedName = user?.displayName + "@" + curUsername;
			const updatedUser = await Auth.updateUser(combinedName, profileUrl);

			setAuthUser({ ...updatedUser, isNewUser });
			setLoading(false);

         const values = {
				name: updatedUser.name,
            profileUrl: updatedUser.profileUrl,
				followers: [],
				following: 0,
				privateInfo: {
					gender: "Male",
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
