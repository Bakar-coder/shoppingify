import React, { FC, InputHTMLAttributes } from "react";

type propTypes = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error: any;
  field?: string;
};

const InputField: FC<propTypes> = ({ size: _, ...props }) => (
  <div className="form__group">
    {props.type === `file` ? (
      <input
        type="file"
        name={props.name}
        id={props.id}
        className={props.error ? `form__input error-input` : `form__input`}
        onChange={props.onChange}
        required={props.required}
      />
    ) : (
      <input
        type={props.type ? props.type : `text`}
        name={props.name}
        id={props.id}
        value={props.value}
        className={props.error ? `form__input error-input` : `form__input`}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
      />
    )}
    {props.error && <p className="error">{props.error}</p>}
  </div>
);

export default InputField;
