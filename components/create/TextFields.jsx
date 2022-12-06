import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Field = ({ styles, desc, maxChar, placeholder, name, setValues }) => {
	const [charCount, setCharCount] = useState(maxChar);

	return (
		<div className="mt-6">
			<div
				contentEditable
				className={`${styles} relative w-full focus:outline-none empty:before:content-[attr(placeholder)] empty:before:text-dark-gray cursor-text peer after:absolute after:w-full after:h-[1px] after:bg-black/30 after:bottom-0 after:left-0 pb-2.5 focus:after:h-[2px] focus:after:bg-blueish`}
				placeholder={placeholder}
				onInput={(e) => {
					setCharCount(maxChar - e.target.outerText.trim().length);
					setValues((prev) => ({
						...prev,
						[name]: e.target.outerText.trim(),
					}));
				}}
			></div>

			<div className="flex justify-between text-xs opacity-0 peer-focus:opacity-100 mt-[2px] text-dark-gray">
				<span>{desc}</span>
				<span className="w-6 text-right">{charCount}</span>
			</div>
		</div>
	);
};

const TextFields = ({ children, setValues }) => {
	const fields = {
		title: {
			styles: "heading",
			desc: "The first 40 characters that shows up in the pin feeds",
			maxChar: 100,
			placeholder: "Add your title",
		},
		description: {
			desc: "People will see the first 100 characters of description when they click on your pin",
			maxChar: 750,
			placeholder: "Tell everyone about your pin",
		},
	};

	const handleCheck = (e) => {
		setValues((prev) => ({
			...prev,
			cmtDisabled: e.target.checked,
		}));
	};

	return (
		<div className="flex flex-col pl-10">
			<Field name="title" setValues={setValues} {...fields.title} />

			<div className="mt-4 flex items-center pr-3 gap-1">
				<Link href="/">
					<a className="mx-1 rounded-full overflow-hidden h-11 w-11 relative">
						<Image
							src="/assets/cat.jpg"
							objectFit="cover"
							layout="fill"
						/>
					</a>
				</Link>

				<Link href="/">
					<a className="font-semibold text-sm">Thien Huynh</a>
				</Link>
			</div>

			<Field
				name="description"
				setValues={setValues}
				{...fields.description}
			/>

			<div className="flex items-center gap-2 mt-2">
				<span>Disable comment section</span>
				<input
					type="checkbox"
					name="disable_comment"
					className="relative appearance-none w-7 h-3.5 bg-dimmed-600 rounded-full transition before:absolute before:left-0 before:h-full before:aspect-square before:rounded-full before:bg-white before:transition-all before:border-2 before:border-dimmed-600 before:box-border checked:before:left-[14px] checked:before:border-blueish checked:bg-blueish"
					onChange={handleCheck}
				/>
			</div>

			<div className="flex-1 flex flex-col justify-end items-end gap-6 mt-6">
				<input
					type="url"
					name="destination"
					placeholder="Add a destination link"
					className="w-full outline-none border-b-[1.5px] border-dimmed-700 pb-2 focus:border-blueish"
				/>

            {children}
			</div>
		</div>
	);
};

export default TextFields;
