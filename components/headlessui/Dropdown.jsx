import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiCheck } from "react-icons/hi";

const Dropdown = ({ options, defaultVal, handleChange, name }) => {
	const [selected, setSelected] = useState(defaultVal);

	useEffect(() => {
		handleChange({
			target: {
				name,
				value: selected.value,
			},
		});
	}, [selected]);

	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className="relative mt-1">
				<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left bg-dimmed-400 hover:bg-dimmed-500 focus-visible:ring-blueish">
					<span className="block truncate">{selected.label}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<IoIosArrowDown className="text-xl" />
					</span>
				</Listbox.Button>

				<Transition
					as={Fragment}
					enter="transform transition duration-[200ms]"
					enterFrom="opacity-0 translate-y-[-30%]"
					enterTo="opacity-100 translate-y-[0]"
					leave="transform duration-200 transition ease-in-out"
					leaveFrom="opacity-100"
					leaveTo="opacity-0 translate-y-[-30%]"
				>
					<Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[8]">
						{options.map((option, idx) => (
							<Listbox.Option
								key={idx}
								value={option}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-9 pr-4 ${
										active ? "bg-dimmed-400" : ""
									}`
								}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{option.label}
										</span>
										{selected && (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blueish">
												<HiCheck />
											</span>
										)}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

export default Dropdown;
