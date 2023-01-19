const TextField = ({
	name,
	label,
	type,
	placeholder,
   defaultVal,
   error,
	handleBlur,
	handleFocus,
   handleChange
}) => {
	return (
		<div className="flex flex-col mb-2">
			<label className="mb-1 text-xs font-light" htmlFor={name}>
				{label}
			</label>

			<input
				className={`py-2 px-4 w-full rounded-2xl border-2 outline-none border-gray-300 leading-7 hover:border-gray-400 focus:border-blue-500 focus:bg-white ${error && "border-primary hover:border-primary hover:bg-white bg-red-50"}`}
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
            value={defaultVal}
				onBlur={handleBlur}
            onChange={handleChange}
				onFocus={handleFocus}
			/>
         
			<span className="mt-2 text-primary text-sm">{error}</span>
		</div>
	);
};

export default TextField;
