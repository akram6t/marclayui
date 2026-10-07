import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lifts on hover — nice for clickable cards. */
  hover?: boolean;
}

export function Card({ hover = false, className = "", ...rest }: CardProps) {
  return <div className={`mcl-card${hover ? " mcl-card-hover" : ""} ${className}`.trim()} {...rest} />;
}

export function CardHeader({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mcl-card-header ${className}`.trim()} {...rest} />;
}

export function CardTitle({ className = "", ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`mcl-card-title ${className}`.trim()} {...rest} />;
}

export function CardBody({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mcl-card-body ${className}`.trim()} {...rest} />;
}

export function CardFooter({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mcl-card-footer ${className}`.trim()} {...rest} />;
}
