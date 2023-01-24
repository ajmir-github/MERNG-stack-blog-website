import Link from "next/link";
import { useEffect } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import BlogsContainer from "../components/BlogsContainer";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { ThreeDotsVertical, Eye, Tags } from "react-bootstrap-icons";

const getPostsQueryWithStats = gql`
  {
    posts(page: { limit: 15 }) {
      _id
      title
      category
      description
      thumbnail
      author {
        _id
        name
        profile
      }
      createdAt
      views
      keywords
    }
    stats(categoriesLimit: 8, keywordsLimit: 16) {
      count {
        users
        posts
        comments
      }
      categories {
        category
        count
      }
      keywords {
        keyword
        count
      }
    }
  }
`;

function SideContainer({ stats: { count, categories, keywords } }) {
  return (
    <div className="flex flex-col gap-2">
      {/* one */}
      <div className="alert shadow">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">Attention!</h3>
            <div className="text-xs">
              You can become a blogger by sign up in this website
            </div>
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm btn-primary">Sign Up</button>
        </div>
      </div>
      {/* two */}
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value">{count.users}</div>
          <div className="stat-desc">The number of registered users</div>
        </div>

        <div className="stat">
          <div className="stat-title">Posts</div>
          <div className="stat-value">{count.posts}</div>
          <div className="stat-desc">The number of post made so far</div>
        </div>

        <div className="stat">
          <div className="stat-title">Comments</div>
          <div className="stat-value">{count.comments}</div>
          <div className="stat-desc">
            The number of comments make on the posts
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({
  _id,
  title,
  category,
  description,
  thumbnail,
  author, //_id,nameprofile
  views,
  keywords,
  createdAt,
}) {
  const editable = 1;
  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden">
      <div className="w-full">
        <Image
          src={thumbnail}
          width={400}
          height={400}
          className="w-full h-full aspect-square"
          alt={title}
        />
      </div>
      <div className="w-full bg-base-100 p-4 flex flex-col gap-2 justify-between">
        {/* TOP */}
        <div className="flex w-full items-center">
          <Link className="flex  gap-4 grow items-center" href={author._id}>
            <div className="avatar ">
              <div className="w-14 rounded-full ring ring-offset-base-100 ring-offset-1 ">
                <Image src={thumbnail} width={48} height={48} />
              </div>
            </div>
            <div className="grow">
              <h4 className="hover:text-primary">{author.name}</h4>
              <p className="text-sm opacity-50">
                {new Date(createdAt).toDateString()}
              </p>
            </div>
          </Link>
          {editable && (
            <div>
              <button className="btn btn-circle btn-ghost">
                <ThreeDotsVertical size={18} />
              </button>
            </div>
          )}
        </div>
        {/* Descriptions */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">{title}</h1>
          <div className="flex">
            <div className="grow flex">{category}</div>
          </div>
          <p className="text-md text-gray-400">{description}</p>
        </div>

        {keywords && keywords.length > 0 && (
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <Tags size={18} />
            {keywords.map((keyword) => (
              <Link className="btn btn-xs" href={`/?keyword=${keyword}`}>
                {keyword}
              </Link>
            ))}
          </div>
        )}
        {/* bottom */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2 text-gray-500">
            <Eye />
            {views}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostsContainer({ posts }) {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
}

export default function Home() {
  const { loading, error, data } = useQuery(getPostsQueryWithStats);

  if (loading)
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 p-2">
      <div className="lg:col-span-4 xl:col-span-3 md:order-2">
        {data.stats && <SideContainer stats={data.stats} />}
      </div>
      <div className="lg:col-span-8 xl:col-span-9 md:order-1">
        {data.posts && <PostsContainer posts={data.posts} />}
      </div>
    </div>
  );
}
