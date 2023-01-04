import { useState } from "react";
import Link from "next/link";
import Avatar from "../common/Avatar";
import { useValidation } from "../../hooks";
import Checkbox from "../headlessui/Checkbox";

const Field = ({
	styles,
	desc,
	maxCharCount,
	placeholder,
	name,
	setValues,
}) => {
	const [charCount, setCharCount] = useState(maxCharCount);
	const [allowInput, setAllowInput] = useState(true);
	const { checkLength } = useValidation();

	const handleKeyDown = (e) => {
		if (e.keyCode <= 222 && e.keyCode >= 65 && !e.metaKey && !allowInput) {
			e.preventDefault();
		}
	};

	const handleInput = (e) => {
		const curText = e.target.innerText.trim();
		const len = maxCharCount - curText.length;

		setAllowInput(len > 0);

		if (checkLength(curText, 0, maxCharCount)) {
			e.target.innerText = curText.slice(0, maxCharCount);
			len = 0;
		}

		setCharCount(len);
		setValues((prev) => ({
			...prev,
			[name]: e.target.innerText,
		}));
	};

	return (
		<div className="mt-6">
			<div
				contentEditable
				className={`${styles} relative w-full focus:outline-none empty:before:content-[attr(placeholder)] empty:before:text-dark-gray cursor-text peer after:absolute after:w-full after:h-[1px] after:bg-black/30 after:bottom-0 after:left-0 pb-2.5 focus:after:h-[2px] focus:after:bg-blueish`}
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
				onInput={handleInput}
			/>

			<div className="flex justify-between text-xs opacity-0 peer-focus:opacity-100 mt-[2px] text-dark-gray">
				<span>{desc}</span>
				<span className="w-6 text-right">{charCount}</span>
			</div>
		</div>
	);
};

const ContentBuilder = ({
	children,
	setValues,
	invalidUrlMsg,
	setInvalidUrlMsg,
}) => {
	const { checkUrl } = useValidation();

	const fields = [
		{
			name: "title",
			styles: "heading",
			desc: "The first 40 characters that shows up in the pin feeds",
			maxCharCount: 100,
			placeholder: "Add your title",
		},
		{
			name: "description",
			desc: "People will see the first 100 characters of description when they click on your pin",
			maxCharCount: 750,
			placeholder: "Tell everyone about your pin",
		},
	];

	const handleCheck = (e) => {
		const { name, checked } = e.target;

		setValues((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleChange = (e) => {
		const { value } = e.target;

		if (checkUrl(value)) {
			setInvalidUrlMsg(
				'A valid URL must:\n- Start with "https://" or "http://"\n- Have a valid domain'
			);
		} else {
			setInvalidUrlMsg("");
			setValues((prev) => ({
				...prev,
				link: value,
			}));
		}
	};

	return (
		<div className="flex flex-col pl-10 min-w-0">
			<Field setValues={setValues} {...fields[0]} />

			<div className="mt-4 flex items-center pr-3 gap-1">
				<Link href="/">
					<a className="mx-1 rounded-full overflow-hidden h-11 w-11 relative">
						<Avatar size={11} src="/assets/cat.jpg" />
					</a>
				</Link>

				<Link href="/">
					<a className="font-semibold text-sm">Thien Huynh</a>
				</Link>
			</div>

			<Field setValues={setValues} {...fields[1]} />

			<div className="flex items-center gap-2 mt-2">
				<span>Disable comment section</span>
				<Checkbox
					name="cmtDisabled"
					handleCheck={handleCheck}
					srOnly="Disable comment"
				/>
			</div>

			<div className="flex-1 flex flex-col justify-end items-end gap-4 mt-6">
				<div className="w-full">
					<input
						type="url"
						name="destination"
						placeholder="Add a destination link"
						className="w-full outline-none border-b-[1.5px] border-dimmed-700 pb-2 focus:border-blueish"
						onChange={handleChange}
						style={{
							borderBottom: `${
								invalidUrlMsg && "1.5px solid var(--clr-primary)"
							}`,
						}}
					/>

					<span className="text-xs text-primary mt-1 h-12 block whitespace-pre-wrap">
						{invalidUrlMsg}
					</span>
				</div>

				{children}
			</div>
		</div>
	);
};

export default ContentBuilder;
