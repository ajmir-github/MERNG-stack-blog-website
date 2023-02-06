import { useRouter } from "next/router";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { parseQuery } from "../../utils/queryParser";
import PostCard from "./PostCard";

export default function PostsContainer({
  posts,
  loading,
  hasMore,
  fetchPosts,
}) {
  const router = useRouter();
  const loadmore = () => fetchPosts({ offset: posts.length }, true);
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
      <div className="grid gap-y-2">
        {loading ? (
          <>
            <PostsContainer posts={posts} />
            <div className="btn btn-ghost btn-xl loading"></div>
          </>
        ) : (
          <div className="btn-group gap-[2px]">
            <button
              className={"btn btn-primary grow"}
              onClick={loadmore}
              disabled={!hasMore}
            >
              <ArrowDown size={18} />
              {hasMore ? "Load More" : "No more Posts!"}
            </button>
            <a className={"btn btn-secondary grow"} href="#top">
              <ArrowUp size={18} /> Scroll Top
            </a>
          </div>
        )}
      </div>
    </>
  );
}
