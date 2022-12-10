import { useContext, createContext } from "react";
import Firestore from "../services/Firestore";
import Storage from "../services/Storage";
import { useAuth } from "./AuthProvider";
import { useValidation } from "./ValidationProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
   const { authUser, setAuthUser } = useAuth();
   const { setError } = useValidation();

   const addPin = async (imgFile, values) => {
      const { id, emailVerified, ...author } = authUser;
      const imgUrl = await Storage.uploadImage(imgFile, "pin");
      return await Firestore.createPin({ author, imgUrl, ...values });
   }

   const addUser = async ({ username, ...optionals }) => {
      const { username: _, ...userData } = authUser;

		if (!(await Firestore.usernameExists(username))) {
         const updatedUser = await Auth.updateUsername(username);
         setAuthUser(updatedUser);
			await Firestore.createUser(username, { ...optionals, ...userData });
		} else {
         setError({
            invalid: "This username has already existed",
         })
      }
	};

   const addGoogleUser = async (username, otherData) => {
      if (!(await Firestore.usernameExists(username))) {
         const updatedUser = await Auth.updateUsername("");
         setAuthUser(updatedUser);
		} else {
         await Firestore.createUser(username, otherData);
      }
   }

   const value = {
      addPin,
      addUser,
      addGoogleUser,
   }

   return (
      <DbContext.Provider value={value}>
         {children}
      </DbContext.Provider>
   )
}

export default DbProvider;