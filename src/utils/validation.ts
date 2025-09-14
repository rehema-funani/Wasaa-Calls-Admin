// src/utils/validation.ts

/**
 * Validates an email address.
 * @param email The email to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password based on common strength criteria.
 * @param password The password to validate.
 * @returns True if the password is valid, false otherwise.
 */
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Checks if a value is not empty or just whitespace.
 * @param value The string value to check.
 * @returns True if the value is not empty, false otherwise.
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};