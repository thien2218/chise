import { useEffect } from "react";
import Dropdown from "../headlessui/Dropdown";
import AutoComplete from "../headlessui/AutoComplete";
import { useLib } from "../../hooks";
import { Firestore } from "../../services";

const PrivateInfo = ({ authUser, values, setValues }) => {
	const { countryList, genderList, getCurDate } = useLib();

   useEffect(() => {
      Firestore.getUser(authUser.username).then((user) => {
         console.log(user.private);
      });
   }, []);

	const handleChange = (e) => {
      console.log(e.target.value);
   };

	return (
		<div>
			<h1 className="text-3xl font-medium">Personal information</h1>
			<h2 className="mt-2 text-dark-gray">
				This information is private and will not be visible in your public profile.
			</h2>

			<form className="mt-5">
				<div className="mt-4">
					<label className="text-xs font-light">Gender</label>
					<Dropdown
						handleChange={handleChange}
						name="gender"
						defaultVal={genderList[0]}
						options={genderList}
					/>
				</div>

				<div className="mt-4">
					<label className="text-xs font-light">Country/region</label>
					<AutoComplete
						handleChange={handleChange}
						defaultVal="United States of America"
						name="country"
						options={countryList}
					/>
				</div>

				<div className="flex flex-col mt-4">
					<label htmlFor="birthday" className="text-xs font-light">
						Birthday
					</label>

					<input
						type="date"
						name="birthday"
						id="birthday"
						className="pl-3 pr-2 py-2 rounded-lg border-[1.5px] border-dimmed-600"
						// value={values.birthday}
						max={getCurDate()}
						onChange={handleChange}
					/>
				</div>
			</form>
		</div>
	);
};

export default PrivateInfo;
