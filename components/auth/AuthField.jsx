import { useValidation } from "../../hooks";

const AuthField = ({
	name,
	label,
	type,
	placeholder,
   error,
	handleBlur,
	handleFocus,
   handleChange
}) => {
	return (
		<div className="form-field mb-2">
			<label className="form-label pointer-events-none" htmlFor={name}>
				{label}
			</label>

			<input
				className={`form-input ${error && "invalid"}`}
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
				onBlur={handleBlur}
            onChange={handleChange}
				onFocus={handleFocus}
			/>
         
			<span className="form-message">{error}</span>
		</div>
	);
};

export default AuthField;
