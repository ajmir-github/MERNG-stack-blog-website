import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { classes } from "../utils";
import { useState } from "react";

const BlogCard = ({ img, title, author, description, link }) => {
  const [loading, setLoading] = useState(true);
  const stopLoading = () => setLoading(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
      <div className="w-full">
        <Image
          src={img}
          className={classes(
            "aspect-[4/3] rounded-box w-full",
            loading ? "hidden" : "block"
          )}
          alt="Shoes"
          width={480}
          height={360}
          loading="eager"
          onLoad={stopLoading}
        />
        <button
          className={classes(
            "loading btn-ghost btn h-full w-full",
            loading || "hidden"
          )}
        ></button>
      </div>
      <div className="flex flex-col justify-between items-stretch gap-2">
        <div>
          <h2 className="text-xl">{title}</h2>
          <h2 className="text-md">By {author}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <Link
          href={link}
          className="btn btn-primary btn-outline items-center justify-between"
        >
          Readmore <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

function getPosts(length = 16) {
  let data = [];
  for (let index = 0; index < length; index++)
    data.push({
      id: index,
      img: faker.image.business(600, 480, true),
      title: faker.commerce.productName(),
      author: faker.company.name(),
      description: faker.commerce.productDescription(),
    });

  return data;
}

export default function BlogsContainer() {
  const [posts, setPosts] = useState(getPosts());
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:px-4 lg:px-8 gap-2 md:gap-4 lg:gap-y-8">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          link="/"
          img={post.img}
          title={post.title}
          author={post.author}
          description={post.description}
        />
      ))}
    </div>
  );
}
