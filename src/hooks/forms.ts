import { useState } from "react";

export const useFormValue = <T>(defaultValue?: T) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string>();

  return { value, setValue, error, setError };
};
