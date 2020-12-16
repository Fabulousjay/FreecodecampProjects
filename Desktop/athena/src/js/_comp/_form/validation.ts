export interface ValidationProps {
  status: boolean;
  errorText?: string;
}

export const isRequired = (name: string, value: string): ValidationProps => ({
  status: !!value,
  errorText: `The ${name} field is required!!`,
});

export const emailIsValid = (value: string): ValidationProps => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return { status: re.test(String(value).toLowerCase()) };
};

export const emailIsAvailable = (): ValidationProps => ({ status: true });

export const passwordIsValid = (value: string): ValidationProps => {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  return { status: re.test(value) };
};

export const passwordIsRepeated = (): ValidationProps => ({ status: true });
