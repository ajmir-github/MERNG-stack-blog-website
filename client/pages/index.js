import { useQuery, gql } from "@apollo/client";
import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";
import HomeLayout from "../components/Layout/HomeLayout";
import { client, getPosts, getStats } from "../ApolloClientProvider";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { classes } from "../styles";

export default function Home({ posts: initalPosts, stats }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const { refetch } = useQuery(getPosts, {
    ssr: false,
    skip: true,
    variables: {
      limit: 8,
      offset: 0,
    },
  });
  const loadmore = () => {
    setLoading(true);
    console.log({
      limit: 16,
      offset: posts.length,
      ...(search && { search }),
    });
    refetch({
      limit: 16,
      offset: posts.length,
      ...(search && { search }),
    }).then((value) => {
      setLoading(false);
      setPosts([...posts, ...value.data.posts]);
    });
  };

  const searchPosts = (value) => {
    setPosts([]);
    setSearch(value);
    loadmore();
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
            disabled={loading}
          >
            <ArrowDown size={18} /> Load More
          </button>
          <a className={"btn btn-secondary grow"} href="#top">
            <ArrowUp size={18} /> Scroll Top
          </a>
        </div>
      </div>
    </HomeLayout>
  );
}

export async function getServerSideProps() {
  const data = await client.query({
    query: getStats,
  });

  if (data.error)
    return {
      props: {
        error: data.error,
        errors: data.errors,
      },
    };

  return {
    props: data.data,
  };
}
