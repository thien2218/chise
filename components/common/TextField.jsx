const TextField = ({
	name,
	label,
	type,
	placeholder,
   defaultValue,
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
				className={`py-2 px-4 w-full rounded-2xl border-2 outline-none border-[#cdcdcd] leading-7 hover:border-[#888888] focus:border-[#257ef2] ${error && "border-primary hover:border-primary hover:bg-white bg-red-50"}`}
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
            value={defaultValue}
				onBlur={handleBlur}
            onChange={handleChange}
				onFocus={handleFocus}
			/>
         
			<span className="mt-2 text-primary text-sm">{error}</span>
		</div>
	);
};

export default TextField;
