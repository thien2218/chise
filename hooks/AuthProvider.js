import { useContext, useState, createContext } from "react";
import Auth from "../services/Auth";
import { useValidation } from "./ValidationProvider";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(null);
   const { error, setError } = useValidation();

   const setUserOrError = (user, error) => {
      if (user) setAuthUser(user);
      else setError(error);
   }

   const login = async (email, password) => {
      const { user, error } = await Auth.login(email, password);
      setUserOrError(user, error);
   }

   const signup = async (email, password) => {
      const { user, error } = await Auth.signup(email, password);
      setUserOrError(user, error);
   }

   const logout = async () => {
      setAuthUser({});
      return await Auth.logout();
   }

   const value = {
      authUser,
      error,
      setError,
      login,
      signup,
      logout,
   }

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;