const TextField = ({
	name,
	label,
	type,
	placeholder,
   displayValue,
   error,
	handleBlur,
	handleFocus,
   handleChange
}) => {
	return (
		<div className="flex flex-col mb-2">
			<label className="ml-2 mb-1 text-sm pointer-events-none" htmlFor={name}>
				{label}
			</label>

			<input
				className={`py-2 px-4 w-full rounded-2xl border-2 outline-none border-[#cdcdcd] leading-7 hover:border-[#888888] focus:border-[#257ef2] ${error && "invalid"}`}
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
            value={displayValue}
				onBlur={handleBlur}
            onChange={handleChange}
				onFocus={handleFocus}
			/>
         
			<span className="mt-2 text-primary text-sm">{error}</span>
		</div>
	);
};

export default TextField;
