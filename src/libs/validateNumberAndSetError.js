import { isValidPhoneNumber } from "react-phone-number-input";

export function validateNumberAndSetError(number, setError) {
  const isValid = number && isValidPhoneNumber(number) && number.length >= 14;
  setError(!isValid);
}
