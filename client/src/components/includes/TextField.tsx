import React, { InputHTMLAttributes } from "react";

type propTypes = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error: any;
  field?: string;
  onChange?: any;
};

const TextInputField: React.FC<propTypes> = ({ size: _, ...props }) => (
  <div className="form__group">
    <textarea
      cols={30}
      rows={2}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      className={
        props.error?.errors && props.error?.field === `description`
          ? `form__input error-input`
          : `form__input`
      }
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
    {props.error?.errors && props.error?.field === `description` && (
      <p className="error">{props.error?.msg}</p>
    )}
  </div>
);

export default TextInputField;
