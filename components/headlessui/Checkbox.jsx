import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

const Checkbox = ({ srOnly, handleCheck, name }) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		handleCheck({
			target: {
				name,
				checked: enabled,
			},
		});
	}, [enabled]);

	return (
      <Switch
         checked={enabled}
         onChange={setEnabled}
         className={`${
            enabled ? "bg-blueish" : "bg-dimmed-700"
         } relative inline-flex h-3.5 w-7 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
         <span className="sr-only">{srOnly}</span>
         <span
            aria-hidden="true"
            className={`${
               enabled ? "translate-x-3.5" : "translate-x-0"
            } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
         />
      </Switch>
	);
};

export default Checkbox;
