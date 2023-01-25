import Link from "next/link";
import { useState } from "react";
import {
  House,
  BoxArrowInRight,
  FileRichtext,
  CameraVideo,
  Code,
  ArrowRight,
} from "react-bootstrap-icons";

function classes(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LoginModel = ({ open, hanldeClose }) => {
  return (
    <div className={classes("modal", open && "modal-open")}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </p>
        <div className="modal-action">
          <button onClick={hanldeClose} className="btn">
            Yay!
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [signed, setSigned] = useState(0);
  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => {
    setLoginModal(true);
  };
  const closeLoginModal = () => {
    setLoginModal(false);
    setSigned((p) => !p);
  };
  return (
    <>
      <LoginModel open={loginModal} hanldeClose={closeLoginModal} />
      <div className="navbar backdrop-blur">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu bg-base-100 rounded-lg menu-compact dropdown-content mt-3 p-2 shadow w-52"
            >
              <li>
                <Link href="/">
                  <House />
                  Home
                </Link>
              </li>

              <li>
                <Link href="/blogs">
                  <FileRichtext />
                  Blogs
                </Link>
              </li>

              <li>
                <Link href="/shorts">
                  <CameraVideo />
                  Vlogs
                </Link>
              </li>
              <li tabIndex={0}>
                <div className="justify-between">
                  <div className="flex items-center gap-2">
                    <Code />
                    Courses
                  </div>
                  <ArrowRight />
                </div>

                <ul className="p-2 bg-base-100 rounded-lg">
                  <li>
                    <Link href="/courses/coursesName">Educations</Link>
                  </li>
                  <li>
                    <Link href="/courses/coursesName">Songs</Link>
                  </li>
                  <li>
                    <Link href="/courses/coursesName">Sports</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost upper-case text-xl" href="/">
            <span className="hidden sm:block">Afghan Code Camp</span>
            <span className="sm:hidden">ACC</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  px-1 ">
            <li>
              <Link href="/">
                <House />
                Home
              </Link>

              <Link href="/blogs">
                <FileRichtext />
                Blogs
              </Link>
            </li>

            <li>
              <Link href="/shorts">
                <CameraVideo />
                Vlogs
              </Link>
            </li>
            <li tabIndex={0}>
              <Link href="/category">
                <Code />
                Courses
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </Link>
              <ul className="dropdown bg-base-100 rounded-lg p-2">
                <li>
                  <Link href="/courses/coursesName">Educations</Link>
                </li>
                <li>
                  <Link href="/courses/coursesName">Songs</Link>
                </li>
                <li>
                  <Link href="/courses/coursesName">Sports</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {signed ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-lg  w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="btn gap-2 btn-ghost btn-square"
            >
              <BoxArrowInRight size={26} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
