import { useQuery, gql } from "@apollo/client";
import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";
import HomeLayout from "../components/Layout/HomeLayout";
import { client, getPostsWithStatsQuery } from "../ApolloClientProvider";

export default function Home({ posts, stats }) {
  return (
    <HomeLayout
      leftElement={
        stats && (
          <LeftSideContainer
            categories={stats.categories}
            keywords={stats.keywords}
          />
        )
      }
      rightElement={stats && <RightSideContainer count={stats.count} />}
    >
      {posts && <PostsContainer posts={posts} />}
    </HomeLayout>
  );
}

export async function getServerSideProps() {
  const data = await client.query({
    query: getPostsWithStatsQuery,
  });

  if (data.error)
    return {
      props: {
        error: data.error,
        errors: data.errors,
      },
    };

  console.log(data.data);

  return {
    props: data.data,
  };
}
