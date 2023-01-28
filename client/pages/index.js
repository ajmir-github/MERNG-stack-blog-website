import { useQuery, gql } from "@apollo/client";
import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";
import HomeLayout from "../components/Layout/HomeLayout";

const getPostsQueryWithStats = gql`
  {
    posts(page: { limit: 24 }) {
      _id
      title
      category
      description
      thumbnail
      author {
        _id
        name
        profile
      }
      createdAt
      views
      keywords
    }
    stats(categoriesLimit: 12, keywordsLimit: 24) {
      count {
        users
        posts
        comments
      }
      categories {
        category
        count
      }
      keywords {
        keyword
        count
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(getPostsQueryWithStats);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <button className="btn btn-ghost btn-xl loading"></button>
      </div>
    );

  return (
    <HomeLayout
      leftElement={
        data.stats && (
          <LeftSideContainer
            categories={data.stats.categories}
            keywords={data.stats.keywords}
          />
        )
      }
      rightElement={
        data.stats && <RightSideContainer count={data.stats.count} />
      }
    >
      {data.posts && <PostsContainer posts={data.posts} />}
    </HomeLayout>
  );
}
