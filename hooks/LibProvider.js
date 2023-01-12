import { useContext, createContext } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import _ from "lodash";

const LibContext = createContext();
export const useLib = () => useContext(LibContext);

const LibProvider = ({ children }) => {
	const { isEqual } = _;

	const genderList = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
      { label: "Other", value: "other" },
	];

	countries.registerLocale(enLocale);
	const countryObj = countries.getNames("en", { select: "official" });
	const countryList = Object.entries(countryObj).map(([key, value]) => {
		return value;
	});

	const getCurDate = () => {
		const yourDate = new Date();
      const yyyyMMdd = yourDate.toISOString().split('T')[0];

      return yyyyMMdd;
	};

	const value = {
		isEqual,
		genderList,
		countryList,
      getCurDate,
	};

	return <LibContext.Provider value={value}>{children}</LibContext.Provider>;
};

export default LibProvider;
