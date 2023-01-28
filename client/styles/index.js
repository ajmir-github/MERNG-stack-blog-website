export function classes(...cls) {
  return cls.filter(Boolean).join(" ");
}

export const PageContainerClasses = "bg-gray-300 dark:bg-gray-700";
export const boxClasses =
  "bg-gray-100 dark:bg-gray-800 rounded-box text-gray-800 dark:text-gray-100 shadow-lg";

const test = <h1 className="shadow-none"></h1>;
