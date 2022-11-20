const AuthField = ({ name, label, type, placeholder, handleBlur }) => {
	return (
		<div className="form-field mb-2">
			<label className="form-label pointer-events-none" htmlFor={name}>
				{label}
			</label>
			<input
				// className={`form-input ${message[name] ? "invalid" : ""}`}
				className="form-input"
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
				onBlur={(e) => handleBlur(name, e)}
				// onFocus={handleFocus}
			/>
			{/* <span className="form-message">{message[name]}</span> */}
		</div>
	);
};

export default AuthField;
