import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";
import HomeLayout from "../components/Layout/HomeLayout";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { classes } from "../styles";
import axios from "axios";
import { APIs } from "../services";
import { useRouter } from "next/router";
import { parseQuery } from "../utils/queryParser";
import Link from "next/link";

export default function Home({ posts: initalPosts, stats }) {
  const router = useRouter();

  const [posts, setPosts] = useState([...initalPosts]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [fetchable, setFetchable] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Fetch the post using the params
  const fetchPosts = () => {
    setLoading(true);
    console.log(params);
    axios.get(APIs.getPosts, { params }).then((res) => {
      console.log(res.request);
      const { data } = res;
      setPosts([...posts, ...data]);
      if (data.length === 0) setHasMore(false);
      setLoading(false);
    });
  };

  // Make a request when params is updated
  useEffect(() => {
    if (fetchable) {
      fetchPosts();
      router.push(parseQuery(params), undefined, { shallow: true });
    }
  }, [params]);
  // Only for the first time
  useEffect(() => {
    setParams(router.query);
  }, []);

  // Using the existing params load more posts
  const loadmore = () => {
    if (!fetchable) setFetchable(true);
    setParams({
      ...params,
      offset: posts.length,
    });
  };

  // inject the filer param
  const filter = (value) => {
    console.log("filter");
    if (!fetchable) setFetchable(true);
    // reset
    setPosts([]);
    setHasMore(true);
    // new param
    setParams({
      ...params,
      offset: 0,
      filter: value,
    });
  };

  return (
    <HomeLayout
      leftElement={
        stats && (
          <LeftSideContainer
            categories={stats.categories}
            keywords={stats.keywords}
            filter={filter}
          />
        )
      }
      rightElement={stats && <RightSideContainer count={stats.count} />}
    >
      <div className="grid gap-y-2">
        {posts && <PostsContainer posts={posts} />}
        {loading ? (
          <div className="btn btn-ghost btn-xl loading"></div>
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
    </HomeLayout>
  );
}

export async function getServerSideProps(req) {
  const params = req.query;
  const postsRes = await axios.get(APIs.getPosts, { params });
  const statsRes = await axios.get(APIs.getStats);
  return {
    props: {
      posts: postsRes.data,
      stats: statsRes.data,
    },
  };
}
