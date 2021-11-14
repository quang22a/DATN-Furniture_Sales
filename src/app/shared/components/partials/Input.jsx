import { ErrorMsg } from "./ErrorMsg";

export const Input = (props) => {
  const {
    id,
    type,
    placeholder,
    validate,
    errors,
    para,
    label,
    className,
    name,
    value,
    onChange,
  } = props;
  console.log(errors?.message);
  return (
    <div className={para ? "form-group terms" : "form-group"}>
      <label htmlFor={id}>{label}</label>
      {onChange ? (
        <input
          id={id}
          name={name}
          className={className}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
          value={value}
          {...validate}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <input
          id={id}
          name={name}
          className={className}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
          value={value}
          {...validate}
        />
      )}
      {para && <span className="check-terms">{para}</span>}
      {errors && <ErrorMsg msg={errors.message} />}
    </div>
  );
};
