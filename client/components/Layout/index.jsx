import Navbar from "../Navbar";

export default function Layout(props) {
  return (
    <div className="grid gap-2 bg-gray-700 min-h-screen">
      <nav className="flex justify-center">
        <div className="max-w-screen-xl w-full">
          <Navbar />
        </div>
      </nav>
      <main className="flex justify-center">
        <div className="max-w-screen-xl">{props.children}</div>
      </main>
    </div>
  );
}
