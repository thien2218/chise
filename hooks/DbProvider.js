import { useContext, createContext } from "react";
import Firestore from "../services/Firestore";
import Storage from "../services/Storage";
import { useAuth } from "./AuthProvider";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
   const { authUser: { id, emailVerified, ...author } } = useAuth();

   const createPin = async (imgFile, values) => {
      const imgUrl = await Storage.uploadImage(imgFile, "pin");
      return await Firestore.createPin({ author, imgUrl, ...values });
   }

   const value = {
      createPin,
   }

   return (
      <DbContext.Provider value={value}>
         {children}
      </DbContext.Provider>
   )
}

export default DbProvider;