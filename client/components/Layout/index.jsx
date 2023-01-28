import { boxClasses, classes, PageContainerClasses } from "../../styles";
import Navbar from "../Navbar";

export default function Layout(props) {
  return (
    <div className={PageContainerClasses}>
      <div className="grid gap-2 p-2">
        <nav className="flex justify-center items-start">
          <div className={classes("max-w-screen-xl w-full", boxClasses)}>
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
