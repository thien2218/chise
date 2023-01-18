import { useEffect } from "react";
import Dropdown from "../headlessui/Dropdown";
import AutoComplete from "../headlessui/AutoComplete";
import { useLib } from "../../hooks";

const PrivateInfo = ({ values, setValues }) => {
	const { countryList, genderList, getCurrDate } = useLib();
	const { privateInfo } = values;

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			privateInfo: {
				...values.privateInfo,
				[name]: value,
			},
		});
	};

	return (
		<div className="xs:mb-56">
			<h1 className="text-3xl font-medium">Personal information</h1>
			<h2 className="mt-2 mb-5 text-dark-gray">
				This information is private and will not be visible in your public
				profile.
			</h2>

			{privateInfo ? (
				<form>
					<div className="mt-4">
						<label className="text-xs font-light">Gender</label>
						<Dropdown
							handleChange={handleChange}
							name="gender"
							defaultVal={{
								label: privateInfo.gender,
								value: privateInfo.gender,
							}}
							options={genderList}
						/>
					</div>

					<div className="mt-4">
						<label className="text-xs font-light">Country/region</label>
						<AutoComplete
							handleChange={handleChange}
							defaultVal={privateInfo.country}
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
							value={privateInfo.birthday}
							max={getCurrDate()}
							onChange={handleChange}
						/>
					</div>
				</form>
			) : null}
		</div>
	);
};

export default PrivateInfo;
