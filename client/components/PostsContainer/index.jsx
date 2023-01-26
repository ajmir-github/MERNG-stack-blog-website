import { ArrowDown } from "react-bootstrap-icons";
import PostCard from "./PostCard";

export default function PostsContainer({ posts }) {
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
