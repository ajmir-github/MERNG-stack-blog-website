import { useEffect, useState } from "react";

export default function useDarkMode(defaultMode = false) {
  const [mode, setMode] = useState(defaultMode);
  // const turnDarkMode = () => setMode(true);
  // const turnLightMode = () => setMode(false);
  const toggleMode = () => setMode((p) => !p);
  useEffect(() => {
    // ignore the SSR
    if (!document?.documentElement) return;
    if (!mode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  // return [mode, turnDarkMode, turnLightMode, toggleMode];
  console.log({ mode });
  return [mode, toggleMode];
}
