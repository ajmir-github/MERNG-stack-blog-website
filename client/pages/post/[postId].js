import Link from "next/link";

const Post = ({ title, author, date, excerpt }) => {
  return (
    <div className="bg-white rounded-md p-4 mb-4">
      <Link href="/post/[id]" className="text-blue-500 font-medium text-lg">
        {title}
      </Link>
      <div className="text-gray-100 text-sm">
        <p>
          by {author} on {date}
        </p>
      </div>
      <p className="text-gray-100">{excerpt}</p>
    </div>
  );
};

export default Post;
