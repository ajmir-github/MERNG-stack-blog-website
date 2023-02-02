import { ArrowDown } from "react-bootstrap-icons";
import PostCard from "./PostCard";

export default function PostsContainer({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </>
  );
}
