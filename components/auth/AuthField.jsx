import { useValidation } from "../../hooks";

const AuthField = ({
	name,
	label,
	type,
	placeholder,
	handleBlur,
	handleFocus,
}) => {
   const { error } = useValidation();

	return (
		<div className="form-field mb-2">
			<label className="form-label pointer-events-none" htmlFor={name}>
				{label}
			</label>

			<input
				className={`form-input ${error[name] && "invalid"}`}
				autoComplete="off"
				name={name}
				type={type}
				placeholder={placeholder}
				onBlur={(e) => handleBlur(label, name, e)}
				onFocus={handleFocus}
			/>
         
			<span className="form-message">{error[name]}</span>
		</div>
	);
};

export default AuthField;
