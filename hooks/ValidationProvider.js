import { createContext, useContext } from "react";

const ValidationContext = createContext();
export const useValidation = () => useContext(ValidationContext);

const ValidationProvider = ({ children }) => {
   return (
      <ValidationContext.Provider>
         {children}
      </ValidationContext.Provider>
   )
}

export default ValidationProvider;