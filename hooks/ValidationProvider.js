import { createContext, useContext, useState } from "react";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
   const [error, setError] = useState({});

   const value = {
      error,
      setError,
   }

   return (
      <ValidationContext.Provider value={value}>
         {children}
      </ValidationContext.Provider>
   )
}

export default ValidationProvider;