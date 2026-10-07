import React from "react";

export type FieldSize = "sm" | "md" | "lg";

interface FieldChrome {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  size?: FieldSize;
  block?: boolean;
}

function fieldClasses(base: string, size: FieldSize, invalid: boolean): string {
  return [base, `${base}-${size}`, invalid ? `${base}-invalid` : ""].filter(Boolean).join(" ");
}

function Chrome({
  id,
  label,
  hint,
  error,
  block,
  children,
}: { id: string; block?: boolean } & FieldChrome & { children: React.ReactNode }) {
  return (
    <div className={`mcl-field${block ? " mcl-field-block" : ""}`}>
      {label && (
        <label className="mcl-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
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

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, FieldChrome {}

export function Input({ label, hint, error, size = "md", block = false, className = "", id, ...rest }: InputProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const input = (
    <input
      id={inputId}
      className={`${fieldClasses("mcl-input", size, !!error)}${block ? " mcl-input-block" : ""} ${className}`.trim()}
      aria-invalid={error ? true : undefined}
      {...rest}
    />
  );
  if (!label && !hint && !error) return input;
  return (
    <Chrome id={inputId} label={label} hint={hint} error={error} block={block}>
      {input}
    </Chrome>
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldChrome {}

export function Textarea({ label, hint, error, size = "md", block = true, className = "", id, rows = 4, ...rest }: TextareaProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const el = (
    <textarea
      id={inputId}
      rows={rows}
      className={`${fieldClasses("mcl-textarea", size, !!error)} ${className}`.trim()}
      aria-invalid={error ? true : undefined}
      {...rest}
    />
  );
  if (!label && !hint && !error) return el;
  return (
    <Chrome id={inputId} label={label} hint={hint} error={error} block>
      {el}
    </Chrome>
  );
}
