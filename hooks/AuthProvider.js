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
		setError(error ?? {});
	};

	const signup = async ({ email, password }) => {
		const { error } = await Auth.signup(email, password);
		setError(error ?? {});
	};

	const logout = async () => {
		await Auth.logout();
	};

	const value = {
      authUser,
      setAuthUser,
		login,
		signup,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
