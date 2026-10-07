import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  /** Convenience over children: [{ value, label }] */
  options?: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  hint,
  error,
  size = "md",
  options,
  placeholder,
  className = "",
  id,
  children,
  ...rest
}: SelectProps) {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  const select = (
    <span className={`mcl-select-shell ${className}`.trim()}>
      <select
        id={selectId}
        className={`mcl-select mcl-select-${size}${error ? " mcl-select-invalid" : ""}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
    </span>
  );
  if (!label && !hint && !error) return select;
  return (
    <div className="mcl-field">
      {label && (
        <label className="mcl-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      {select}
      {error ? (
        <div className="mcl-hint mcl-hint-error" role="alert">
          {error}
        </div>
      ) : hint ? (
        <div className="mcl-hint">{hint}</div>
      ) : null}
    </div>
  );
}
