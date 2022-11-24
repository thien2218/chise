import { useContext, createContext } from "react";
import { Auth } from "../services";
import { useValidation } from "./ValidationProvider";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
   const { setError } = useValidation();

   const login = async ({ email, password }) => {
      const { error } = await Auth.login(email, password);
      setError(error ?? null);
   }

   const signup = async ({ email, password }) => {
      const { error } = await Auth.signup(email, password);
      setError(error ?? null);
   }

   const logout = async () => {
      await Auth.logout();
   }

   const value = {
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