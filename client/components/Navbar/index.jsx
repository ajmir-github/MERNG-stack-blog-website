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
      <div className="flex justify-between px-1">
        <div className="btn btn-ghost gap-2">
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

          <span className="hidden sm:block">Menu</span>
        </div>

        <Link className="btn btn-ghost upper-case text-xl" href="/">
          <span className="hidden sm:block">Afghan Code Camp</span>
          <span className="sm:hidden">ACC</span>
        </Link>

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
            className="btn gap-2 btn-ghost w-auto px-2"
          >
            <BoxArrowInRight size={26} />
            <span className="hidden sm:block">Login</span>
          </button>
        )}
      </div>
    </>
  );
}
