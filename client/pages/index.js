import { useQuery, gql } from "@apollo/client";
import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";
import HomeLayout from "../components/Layout/HomeLayout";
import { client, getPosts, getStats } from "../ApolloClientProvider";
import { useState } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import { classes } from "../styles";

export default function Home({ posts: initalPosts, stats }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    refetch({
      limit: 16,
      offset: posts.length,
    }).then((value) => {
      setLoading(false);
      setPosts([...posts, ...value.data.posts]);
    });
  };

  const searchPosts = (value) => {
    setPosts([]);
    setLoading(true);
    refetch({
      limit: 16,
      offset: posts.length,
      search: value,
    }).then((value) => {
      setLoading(false);
      setPosts([...posts, ...value.data.posts]);
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
        <button
          className={classes("btn btn-primary gap-2", loading && "loading")}
          onClick={loadmore}
          disabled={loading}
        >
          <ArrowDown size={18} /> Load More
        </button>
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
