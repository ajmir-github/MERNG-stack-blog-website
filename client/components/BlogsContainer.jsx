import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { classes } from "../utils";
import { useState } from "react";

const BlogCard = ({
  _id,
  title,
  category,
  description,
  thumbnail,
  author, //{ _id, name, profile }
  createdAt,
}) => {
  const [loading, setLoading] = useState(true);
  const stopLoading = () => setLoading(false);
  return (
    <div className="rounded-xl overflow-hidden lg:card-side bg-base-100 shadow-xl">
      <figure>
        {" "}
        <Image
          src={thumbnail}
          width={480}
          height={480}
          className="h-full w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default function BlogsContainer({ posts }) {
  return (
    <div className="flex flex-wrap">
      {posts.map((post, index) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  );
}
