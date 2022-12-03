import { useState, useContext, createContext } from "react";
import { Auth, Firestore } from "../services";
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

	const createUser = async ({ username, ...optionals }, userData) => {
		if (!(await Firestore.usernameExists(username))) {
         setError({});
         const updatedUser = await Auth.updateUsername(username);
         setAuthUser(updatedUser);
			await Firestore.createUser(username, { ...optionals, ...userData });
		} else {
         setError({
            invalid: "This username has already existed",
         })
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
		createUser,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
