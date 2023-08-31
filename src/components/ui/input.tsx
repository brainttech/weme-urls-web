import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Eye, EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  password?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, password, error = false, helperText, ...props },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
      <div className="relative w-full">
        {label && (
          <Label htmlFor={props.name} className={`${error && "text-red-700"}`}>
            {label}
          </Label>
        )}
        <div className="flex items-center">
          <input
            data-testid="input"
            type={password ? (passwordVisible ? "text" : "password") : type}
            name={props.name}
            id={props.name}
            className={cn(
              `flex h-10 w-full rounded-md border border-input bg-background ${
                error && "border-red-700"
              } px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:border-2  disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            ref={ref}
            {...props}
          />
          {password && (
            <div
              className="absolute  right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </div>
          )}
        </div>

        {helperText && <Label className="text-red-700">{helperText}</Label>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
