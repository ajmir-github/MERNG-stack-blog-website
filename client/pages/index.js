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

export default function Home({ posts: initalPosts, stats }) {
  const router = useRouter();

  const [posts, setPosts] = useState([...initalPosts]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(router.query);
  const [fetchable, setFetchable] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    if (fetchable) {
      fetchPosts();
      router.push(parseQuery(params), undefined, { shallow: true });
    }
  }, [params]);

  const loadmore = () => {
    if (!fetchable) setFetchable(true);
    setParams({
      ...params,
      offset: posts.length,
    });
  };

  const searchPosts = (value) => {
    if (!fetchable) setFetchable(true);
    // reset
    setPosts([]);
    setHasMore(true);
    // new param
    setParams({
      ...params,
      offset: 0,
      search: value,
    });
  };

  return (
    <HomeLayout
      leftElement={
        stats && (
          <LeftSideContainer
            categories={stats.categories}
            keywords={stats.keywords}
            searchPosts={searchPosts}
          />
        )
      }
      rightElement={stats && <RightSideContainer count={stats.count} />}
    >
      <div className="grid gap-y-2">
        {posts && <PostsContainer posts={posts} />}
        <div className="btn-group gap-[2px]">
          <button
            className={classes("btn btn-primary grow", loading && "loading")}
            onClick={loadmore}
            disabled={loading || !hasMore}
          >
            <ArrowDown size={18} />
            {hasMore ? "Load More" : "No more Posts!"}
          </button>
          <a className={"btn btn-secondary grow"} href="#top">
            <ArrowUp size={18} /> Scroll Top
          </a>
        </div>
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
