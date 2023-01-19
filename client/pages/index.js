import Link from "next/link";
import { useEffect } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import BlogsContainer from "../components/BlogsContainer";

export default function Home() {
  return (
    <>
      <BlogsContainer />
    </>
  );
}
