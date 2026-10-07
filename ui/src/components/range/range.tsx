import React, { useState } from "react";

export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** Helper text under the slider. */
  hint?: React.ReactNode;
  /** Shows the current value on the right of the label. Works with both
   *  controlled `value` and uncontrolled `defaultValue`. */
  showValue?: boolean;
}

export function Range({
  label,
  hint,
  showValue = false,
  value,
  defaultValue,
  onChange,
  className = "",
  id,
  ...rest
}: RangeProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string>(() =>
    value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : "0"
  );
  const current = isControlled ? String(value) : inner;

  const input = (
    <input
      id={inputId}
      type="range"
      className={`mcl-range ${className}`.trim()}
      value={isControlled ? value : inner}
      onChange={(e) => {
        if (!isControlled) setInner(e.target.value);
        onChange?.(e);
      }}
      {...rest}
    />
  );

  const field = (
    <div className="mcl-field">
      {label && (
        <label className="mcl-range-head" htmlFor={inputId}>
          <span className="mcl-label">{label}</span>
          {showValue && <span className="mcl-range-value">{current}</span>}
        </label>
      )}
      {input}
      {hint && <div className="mcl-hint">{hint}</div>}
    </div>
  );

  if (!label && !hint) return input;
  return field;
}
