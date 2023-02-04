import { useEffect, useState } from "react";

export default function useInputDebounce(cb, minChar = 3, delay = 1000) {
  const [value, setValue] = useState(null);
  const onChangeFunc = (e) => setValue(e.target.value);
  useEffect(() => {
    const unsub = setTimeout(() => {
      if (value) cb(value);
    }, delay);
    return () => clearTimeout(unsub);
  }, [value]);

  return onChangeFunc;
}
