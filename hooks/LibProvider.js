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
         value: "male",
      },
      {
         label: "Female",
         value: "female",
      },
      {
         label: "Other",
         value: "other",
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

   const downloadImg = (imgUrl) => {
		const xhr = new XMLHttpRequest();

		xhr.responseType = "blob";
		xhr.onload = (event) => {
			const blob = xhr.response;
         const time = new Date().getTime();
         const fileName = `pin_image${time}.webp`;
         const file = new File([blob], fileName, { type: blob.type });

         const url = URL.createObjectURL(file);
         const a = document.createElement("a");
         a.href = url;
         a.download = file.name;
         a.click();
         a.remove();
		};

		xhr.open("GET", imgUrl);
		xhr.send();
	};

	const value = {
		isEqual,
		genderList,
		countryList,
		getCurrDate,
      downloadImg,
	};

	return <LibContext.Provider value={value}>{children}</LibContext.Provider>;
};

export default LibProvider;
