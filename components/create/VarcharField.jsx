import { useState } from "react";

const VarcharField = ({
	isTitle,
	desc,
	maxCount,
	placeholder,
	name,
	setValues,
}) => {
	const [count, setCount] = useState(maxCount);
	const [allowInput, setAllowInput] = useState(true);

	const handleKeyDown = (e) => {
		if (e.keyCode <= 222 && e.keyCode >= 48 && !e.metaKey && !allowInput) {
			e.preventDefault();
		}
	};

	const handleInput = (e) => {
		const curText = e.target.innerText.trim();
		const len = maxCount - curText.length;

		setAllowInput(len > 0);

		if (curText.length > maxCount) {
			e.target.innerText = curText.slice(0, maxCount);
			len = 0;
		}

		setCount(len);
		setValues((prev) => ({
			...prev,
			[name]: e.target.innerText.trim(),
		}));
	};

	return (
		<div className="mt-6">
			<div
				contentEditable
				className={`${isTitle ? "heading" : ""} relative w-full focus:outline-none empty:before:content-[attr(placeholder)] empty:before:text-dark-gray cursor-text peer after:absolute after:w-full after:h-[1px] after:bg-black/30 after:bottom-0 after:left-0 pb-2.5 focus:after:h-[2px] focus:after:bg-blueish`}
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
				onInput={handleInput}
			/>

			<div className="flex justify-between text-xs opacity-0 peer-focus:opacity-100 mt-[2px] text-dark-gray">
				<span className="leading-[18px]">{desc}</span>
				<span className="w-6 text-right leading-[18px]">{count}</span>
			</div>
		</div>
	);
};

export default VarcharField;