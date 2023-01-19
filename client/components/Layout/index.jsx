import Navbar from "../Navbar";

export default function Layout(props) {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
}
