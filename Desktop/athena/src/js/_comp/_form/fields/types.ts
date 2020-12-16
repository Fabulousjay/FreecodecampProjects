import { TextFieldProps } from "@material-ui/core";

export interface CommonFieldProps {
  source: string;
  onValidate?: (status: boolean) => void;
  onChange?: (source: string, value: string) => void;
}

export type CommonTexFieldProps = Omit<TextFieldProps, "onChange"> & {
  source: string;
  onValidate?: (status: boolean) => void;
  onChange: (source: string, value: string) => void;
};
