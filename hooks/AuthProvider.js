import { useState, useContext, createContext } from "react";
import { Auth } from "../services";
import { useValidation } from "./ValidationProvider";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(null);
	const { setError } = useValidation();

	const login = async ({ email, password }) => {
		const { error } = await Auth.login(email, password);
		if (error) setError(error);
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		if (error) setError(error);
	};

   const loginWithGoogle = async (addGoogleUser) => {
      const { user: { username, ...otherData }, isNewUser, error } = await Auth.loginWithGoogle();
		if (error) { setError(error) }
      else if (isNewUser) {
         addGoogleUser(username, otherData);
      }
   }

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
