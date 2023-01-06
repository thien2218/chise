import { useState } from "react";
import { useAuth, useDb } from "../../hooks";
import Dropdown from "../headlessui/Dropdown";
import AutoComplete from "../headlessui/AutoComplete";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import _ from "lodash";

const PrivateForm = () => {
	const { getCurDate, updateUser } = useDb();
	const {
		authUser: { username },
		setAuthUser,
	} = useAuth();

	const initObj = {
		gender: "male",
		country: "United States of America",
		birthday: getCurDate(),
	};
	const [values, setValues] = useState(initObj);

	const genderList = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
	];

	countries.registerLocale(enLocale);
	const countryObj = countries.getNames("en", { select: "official" });
	const countryList = Object.entries(countryObj).map(([key, value]) => {
		return value;
	});

	const handleChange = (e) => {
		const { value, name } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (_.isEqual(initObj, values)) return;

		await updateUser(username, { private: values });
		setAuthUser((prev) => ({
			...prev,
			isNewUser: false,
		}));
	};

	return (
		<form className="fixed overflow-y-scroll w-full h-full flex items-center top-0 z-20">
			<div className="px-4 mx-auto w-full max-w-[26rem]">
				<div className="relative z-40 rounded-2xl bg-white shadow-[rgb(0_0_0_/_50%)_0_0_0_9000px] px-8 py-6">
					<h1 className="text-center text-3xl font-medium">
						You're all set!
					</h1>
					<span className="block text-center mb-2">
						Let's add some more info before you go
					</span>

					<div className="py-3 flex flex-col gap-1 relative">
						<label className="text-xs font-semibold">Gender</label>
						<Dropdown
							handleChange={handleChange}
							name="gender"
                     defaultVal={genderList[0]}
							options={genderList}
						/>
					</div>

					<div className="py-3 flex flex-col gap-1 relative">
						<label className="text-xs font-semibold">Country</label>
						<AutoComplete
							handleChange={handleChange}
							defaultVal="United States of America"
							name="country"
							options={countryList}
						/>
					</div>

					<div className="py-3 flex flex-col gap-1 relative">
						<label htmlFor="birthday" className="text-xs font-semibold">
							Birthday
						</label>

						<input
							type="date"
							name="birthday"
							id="birthday"
							className="pl-3 pr-2 py-2 rounded-lg border-[1.5px] border-dimmed-600"
							value={values.birthday}
							max={getCurDate()}
							onChange={handleChange}
						/>
					</div>

					<span className="text-sm text-dark-gray block text-center mt-3">
						These info will be private for you to look at
					</span>
					<button
						onClick={handleSubmit}
						className="primary-btn w-full py-2 rounded-full relative z-[2] mt-2"
					>
						Done
					</button>
				</div>
			</div>
		</form>
	);
};

export default PrivateForm;
