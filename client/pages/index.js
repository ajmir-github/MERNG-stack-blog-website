import Link from "next/link";
import { useEffect } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import BlogsContainer from "../components/BlogsContainer";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import {
  ThreeDotsVertical,
  Eye,
  Tags,
  Bookmark,
  ChatText,
  ArrowRight,
  Tag,
  Bookmarks,
  ArrowBarDown,
  ArrowDown,
  People,
  CardText,
} from "react-bootstrap-icons";

const getPostsQueryWithStats = gql`
  {
    posts(page: { limit: 24 }) {
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
    stats(categoriesLimit: 12, keywordsLimit: 24) {
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

function LeftSideContainer({ categories, keywords }) {
  return (
    <div className="grid gap-2">
      {/* categories */}
      <div className="grid bg-base-100 p-4 rounded-box gap-2">
        <div className="btn btn-primary gap-2 btn-sm">
          <Bookmarks />
          All categories
        </div>
        <div className="flex flex-wrap gap-1">
          {categories.map(({ category, count }) => (
            <Link
              href={`/category/${category}`}
              className="btn btn-ghost btn-xs gap-1"
            >
              <Bookmark />
              {category}{" "}
              <span className="badge badge-ghost badge-xs">{count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* categories */}
      <div className="grid bg-base-100 p-4 rounded-box gap-2">
        <div className="btn gap-2 btn-secondary btn-sm">
          <Tags /> All tags
        </div>
        <div className="flex flex-wrap gap-1">
          {keywords.map(({ keyword, count }) => (
            <Link
              href={`/keyword/${keyword}`}
              className="btn btn-ghost btn-xs gap-1"
            >
              <Tag />
              {keyword}{" "}
              <span className="badge badge-ghost badge-xs">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
function RightSideContainer({ count }) {
  return (
    <div className="flex flex-col gap-2 ">
      {/* Register */}
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
              You can be a blogger of this website by signin up
            </div>
          </div>
        </div>
        <div className="flex-none">
          <Link href={"/signup"} className="btn btn-sm btn-ghost">
            Sign up
          </Link>
        </div>
      </div>
      {/* two */}
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value">{count.users}</div>
          <div className="stat-desc">+12 This month</div>
          <div className="stat-figure text-secondary">
            <People size={32} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Posts</div>
          <div className="stat-value">{count.posts}</div>
          <div className="stat-desc">+100 This month</div>
          <div className="stat-figure text-secondary">
            <CardText size={32} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Comments</div>
          <div className="stat-value">{count.comments}</div>
          <div className="stat-desc">+234 This month</div>
          <div className="stat-figure text-secondary">
            <ChatText size={32} />
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
  author, //_id,name profile
  views,
  keywords,
  createdAt,
}) {
  const editable = 1;
  const authorElement = (
    <>
      {author.profile && (
        <div className="avatar ">
          <div className="w-14 rounded-full ring ring-offset-base-100 ring-offset-1 hover:ring-primary transition-colors">
            <Image
              src={author.profile || "/assets/user.png"}
              width={48}
              height={48}
            />
          </div>
        </div>
      )}
      <div className="grow">
        <h4 className=" text-lg font-bold">{author.name}</h4>
        <p className="text-gray-400 text-md">{createdAt.date}</p>
      </div>
    </>
  );
  return (
    <div className="grid grid-cols-1 rounded-2xl overflow-hidden bg-base-100 gap-2">
      {/* top: user, date, func to edit and delete */}
      <div className="flex w-full items-center justify-end p-4 md:p-6 lg:p-6">
        {author && author._id ? (
          <Link
            className="flex gap-4 grow items-center"
            href={`/user/${author._id}`}
          >
            {authorElement}
          </Link>
        ) : (
          <div className="flex gap-4 grow items-center">{authorElement}</div>
        )}

        {editable && (
          <div>
            <button className="btn btn-circle btn-ghost">
              <ThreeDotsVertical size={18} />
            </button>
          </div>
        )}
      </div>
      {/* middle: image */}
      {thumbnail && (
        <div className="w-full">
          <Image
            src={thumbnail}
            width={400}
            height={400}
            className="w-full aspect-video"
            alt={title}
          />
        </div>
      )}
      {/* bottom: title, desctiption, category, keywords, views */}
      <div className="w-full p-4 md:p-6 flex flex-col gap-2 justify-between">
        {/* Descriptions */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-md text-gray-400">{description}</p>
        </div>

        <div className="flex justify-start items-center gap-2 flex-wrap">
          {category && (
            <Link
              className="btn btn-xs btn-primary flex gap-2"
              href={`/category/${category}`}
            >
              <Bookmark /> {category}
            </Link>
          )}
          {keywords &&
            keywords.map((keyword) => (
              <Link
                className="btn btn-xs btn-ghost gap-2"
                href={`/keyword/${keyword}`}
              >
                <Tags size={14} /> {keyword}
              </Link>
            ))}
        </div>

        {/* bottom */}
        <div className="flex gap-2">
          <div className="btn-group grow">
            <Link className="btn btn-ghost gap-4 w-1/2" href={`/post/${_id}`}>
              <ArrowRight size={18} /> View
            </Link>
            <Link
              className="btn btn-ghost gap-4 w-1/2"
              href={`/post/${_id}#make-comment`}
            >
              <ChatText size={18} />
              Comment
            </Link>
          </div>
          {views && (
            <div className="flex items-center gap-2 text-gray-400">
              <Eye />
              {views}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostsContainer({ posts }) {
  return (
    <div className="grid gap-y-2">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}

      <button className="btn btn-primary gap-2">
        <ArrowDown size={18} /> Load More
      </button>
    </div>
  );
}

export default function Home() {
  const { loading, error, data } = useQuery(getPostsQueryWithStats);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <button className="btn btn-ghost btn-xl loading"></button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* left and main */}
      <div className="grid grid-cols-1 lg:grid-cols-12 md:col-span-8 lg:col-span-9 gap-y-2 lg:gap-x-2">
        {/* Left */}
        <div className="col-span-4">
          <div className="lg:sticky lg:top-[10px]">
            {data.stats && (
              <LeftSideContainer
                categories={data.stats.categories}
                keywords={data.stats.keywords}
              />
            )}
          </div>
        </div>
        {/* main */}
        <div className="col-span-8">
          {data.posts && <PostsContainer posts={data.posts} />}
        </div>
      </div>

      {/* Right */}
      <div className="md:col-span-4 lg:col-span-3  ">
        <div className="md:sticky md:top-[10px]">
          {data.stats && <RightSideContainer count={data.stats.count} />}
        </div>
      </div>
    </div>
  );
}
