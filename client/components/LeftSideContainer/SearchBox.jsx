import { useEffect, useState } from "react";
import { classes } from "../../styles";

export default function SearchBox({ setSearch }) {
  const [value, setValue] = useState(null);
  const inputChanged = (e) => setValue(e.target.value);
  // Debounce the request
  useEffect(() => {
    const unsub = setTimeout(() => setSearch(value), 1000);
    return () => clearTimeout(unsub);
  }, [value]);

  return (
    <div
      className={classes(
        "w-full p-2",
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg",
        !!value && "border-primary border-2"
      )}
    >
      <input
        type="text"
        placeholder="Search here..."
        className="input bg-transparent input-bordered w-full"
        onChange={inputChanged}
      />
    </div>
  );
}
