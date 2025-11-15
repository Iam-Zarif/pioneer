export interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required.";
  if (password.length < 4) return "at least 4 characters.";
  if (!/[A-Z]/.test(password)) return "at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "at least one lowercase letter.";
  if (!/\d/.test(password)) return "at least one number.";
  if (!/[\W_]/.test(password)) return "at least one special character.";
  return "";
};

export const validateRegister = (values: RegisterFormValues) => {
  const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

  if (!values.first_name || values.first_name.trim().length < 2) {
    errors.first_name = "Please enter a valid name format.";
  }

  if (!values.last_name || values.last_name.trim().length < 2) {
    errors.last_name = "Please enter a valid name format.";
  }

  if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
