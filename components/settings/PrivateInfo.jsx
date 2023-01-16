import { useEffect } from "react";
import Dropdown from "../headlessui/Dropdown";
import AutoComplete from "../headlessui/AutoComplete";
import { useLib } from "../../hooks";
import { Firestore } from "../../services";
import SpinLoader from "../loader/SpinLoader";

const PrivateInfo = ({ authUser, values, setValues, setInitObj }) => {
	const { countryList, genderList, getCurDate } = useLib();

	useEffect(() => {
		Firestore.getUser(authUser.username).then((user) => {
			setValues(user.private);
			setInitObj(user.private);
		});
	}, []);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<div>
			<h1 className="text-3xl font-medium">Personal information</h1>
			<h2 className="mt-2 text-dark-gray">
				This information is private and will not be visible in your public
				profile.
			</h2>

			{Object.keys(values).length ? (
				<form className="mt-5">
					<div className="mt-4">
						<label className="text-xs font-light">Gender</label>
						<Dropdown
							handleChange={handleChange}
							name="gender"
							defaultVal={{
                        label: values.gender,
                        value: values.gender
                     }}
							options={genderList}
						/>
					</div>

					<div className="mt-4">
						<label className="text-xs font-light">Country/region</label>
						<AutoComplete
							handleChange={handleChange}
							defaultVal={values.country}
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
							value={values.birthday}
							max={getCurDate()}
							onChange={handleChange}
						/>
					</div>
				</form>
			) : <SpinLoader />}
		</div>
	);
};

export default PrivateInfo;
