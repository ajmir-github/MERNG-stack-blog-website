import { useEffect, useState } from "react";

export default function useInputDebounce(cb, delay = 1000) {
  const [value, setValue] = useState(null);
  const onChangeFunc = (e) => setValue(e.target.value);
  useEffect(() => {
    const unsub = setTimeout(() => {
      cb(value);
    }, delay);
    return () => clearTimeout(unsub);
  }, [value]);

  return onChangeFunc;
}
