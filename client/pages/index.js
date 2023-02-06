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
import isServerSide from "../utils/isServerSide";
import { parseQuery } from "../utils/queryParser";

export default function Home({ posts: initalPosts, stats }) {
  const router = useRouter();
  const isServer = isServerSide();
  const [posts, setPosts] = useState([...initalPosts]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = (param, append = false) => {
    // Not on server
    if (isServer) return;
    setLoading(true);
    // GET the params
    const params = { ...router.query, ...param };
    if (!append) params.offset = 0;
    const query = parseQuery(params);
    // Change the url
    router.push(query, undefined, { shallow: true });
    // make the request
    axios.get(APIs.getPosts, { params }).then((res) => {
      // Reflect on success
      setPosts(append ? [...posts, ...res.data] : res.data);
      if (res.data.length === 0) setHasMore(false);
      setLoading(false);
    });
  };

  return (
    <HomeLayout
      leftElement={
        <LeftSideContainer
          categories={stats.categories}
          keywords={stats.keywords}
          fetchPosts={fetchPosts}
        />
      }
      rightElement={<RightSideContainer count={stats.count} />}
    >
      <div className="grid gap-y-2">
        <PostsContainer
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          fetchPosts={fetchPosts}
        />
      </div>
    </HomeLayout>
  );
}

export async function getServerSideProps(req) {
  const postsRes = await axios.get(APIs.getPosts, { params: req.query });
  const statsRes = await axios.get(APIs.getStats);
  return {
    props: {
      posts: postsRes.data,
      stats: statsRes.data,
    },
  };
}
