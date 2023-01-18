import { useContext, createContext } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import _ from "lodash";

const LibContext = createContext();
export const useLib = () => useContext(LibContext);

const LibProvider = ({ children }) => {
	const { isEqual } = _;

	const genderList = [
      {
         label: "Male",
         value: "Male",
      },
      {
         label: "Female",
         value: "Female",
      },
      {
         label: "Other",
         value: "Other",
      }
   ];

	countries.registerLocale(enLocale);
	const countryObj = countries.getNames("en", { select: "official" });
	const countryList = Object.entries(countryObj).map(([key, value]) => {
		return value;
	});

	const getCurrDate = () => {
		return new Date().toLocaleDateString('en-ca');
	};

	const value = {
		isEqual,
		genderList,
		countryList,
		getCurrDate,
	};

	return <LibContext.Provider value={value}>{children}</LibContext.Provider>;
};

export default LibProvider;
