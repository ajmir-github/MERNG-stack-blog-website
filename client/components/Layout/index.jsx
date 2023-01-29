import { boxClasses, classes, PageContainerClasses } from "../../styles";
import Navbar from "../Navbar";

export default function Layout(props) {
  return (
    <div className="bg-gray-300 dark:bg-gray-700">
      <div className="grid gap-2 p-2">
        <nav className="flex justify-center items-start">
          <div
            className={classes(
              "max-w-screen-xl w-full",
              "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
            )}
          >
            <Navbar />
          </div>
        </nav>
        <main className="flex justify-center">
          <div className="max-w-screen-xl">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
