import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const RadioInput = ({ srOnly, options }) => {
	const [selected, setselected] = useState(null);

	return (
		<RadioGroup value={selected} onChange={setselected}>
			<RadioGroup.Label className="sr-only">{srOnly}</RadioGroup.Label>

			{options.map((option, idx) => (
				<RadioGroup.Option value={option} key={idx}>
					{({ checked }) => (
						<div className="flex gap-2 mb-3">
							<div
								className={`h-6 aspect-square rounded-full ${
									checked
										? "shadow-[0_0_0_8px_inset] shadow-secondary"
										: "shadow-[0_0_0_2px_inset] shadow-dark-gray"
								}`}
							/>

							<div>
								<span className="cursor-default">{option.label}</span>
								<span className="text-xs text-dark-gray mt-1 block">
									{option.description}
								</span>
							</div>
						</div>
					)}
				</RadioGroup.Option>
			))}
		</RadioGroup>
	);
};

export default RadioInput;
