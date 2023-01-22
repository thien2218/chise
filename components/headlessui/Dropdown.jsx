import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiCheck } from "react-icons/hi";

const Dropdown = ({ options, defaultVal, handleChange, name }) => {
	const currOption = options.find((opt) => opt.value === defaultVal);
	const [selected, setSelected] = useState(currOption);

   useEffect(() => {
      const currOption = options.find((opt) => opt.value === defaultVal);
      setSelected(currOption);
   }, [defaultVal]);

	return (
		<Listbox
			value={selected.value}
			onChange={(value) => {
				const e = {
					target: {
						name,
						value,
					},
				};
				handleChange(e);
			}}
		>
			<div className="relative mt-1">
				<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left bg-dimmed-400 hover:bg-dimmed-500 focus-visible:ring-blue-500">
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
								value={option.value}
								className={({ active }) =>
									`relative cursor-default select-none py-2.5 px-4 ${
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
											<span className="text-blue-500 text-lg absolute inset-y-0 right-0 flex items-center mr-3 pl-1.5">
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
