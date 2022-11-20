import { useContext, createContext } from "react";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);

const DbProvider = ({ children }) => {
   return (
      <DbContext.Provider value={{}}>
         {children}
      </DbContext.Provider>
   )
}

export default DbProvider;