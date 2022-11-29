const FormField = ({ label, name, type, placeholder, message, handleBlur, handleFocus }) => {
   return (
      <div className='form-field mb-2'>
         <label className='form-label pointer-events-none' htmlFor={name}>{label}</label>
         <input className={`form-input ${message[name] ? "invalid" : ""}`} autoComplete='off' name={name} type={type} placeholder={placeholder} onBlur={handleBlur} onFocus={handleFocus} />
         <span className='form-message'>{message[name]}</span>
      </div>
   )
}

export default FormField;