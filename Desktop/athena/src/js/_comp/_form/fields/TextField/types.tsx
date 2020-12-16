export interface CommonTextFieldProps {
  type?: "text" | "email" | "password" | "password_confirmation";
  value?: string;
  source: string;
  className?: string;
  placeholder?: string;
}
