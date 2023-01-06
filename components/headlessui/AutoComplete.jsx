import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiCheck } from "react-icons/hi";

const AutoComplete = ({ options, name, defaultVal, handleChange }) => {
	const [selected, setSelected] = useState(defaultVal);
	const [query, setQuery] = useState("");

	const filteredOptions =
		query === ""
			? options
			: options.filter((option) =>
					option
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
         );

	useEffect(() => {
		handleChange({ target: { name, value: selected } });
	}, [selected]);

	return (
		<Combobox value={selected} onChange={setSelected}>
			<div className="relative mt-1">
				<Combobox.Input
					className="relative w-full rounded-lg border-[1.5px] border-dimmed-600 bg-white py-2 pl-4 pr-10 text-left focus-visible:ring-blueish"
					onChange={(e) => setQuery(e.target.value)}
				/>

				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
					<IoIosArrowDown className="text-xl" />
				</Combobox.Button>

				<Transition
					as={Fragment}
					enter="transform transition duration-[200ms]"
					enterFrom="opacity-0 translate-y-[-10%]"
					enterTo="opacity-100 translate-y-[0]"
					leave="transform duration-200 transition ease-in-out"
					leaveFrom="opacity-100"
					leaveTo="opacity-0 translate-y-[-10%]"
					afterLeave={() => setQuery("")}
				>
					<Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[8]">
						{filteredOptions.length === 0 && query !== "" ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredOptions.map((option, idx) => (
								<Combobox.Option
									key={idx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-9 pr-4 ${
											active ? "bg-dimmed-400" : ""
										}`
									}
									value={option}
								>
									{({ selected, active }) => (
										<>
											<span
												className={`block truncate ${
													selected ? "font-medium" : "font-normal"
												}`}
											>
												{option}
											</span>
											{selected ? (
												<span
													className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
														active ? "bg-dimmed-400" : ""
													}`}
												>
													<HiCheck />
												</span>
											) : null}
										</>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};

export default AutoComplete;
