import { useQuery, gql } from "@apollo/client";
import PostsContainer from "../components/PostsContainer";
import RightSideContainer from "../components/RightSideContainer";
import LeftSideContainer from "../components/LeftSideContainer";

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* left and main */}
      <div className="grid grid-cols-1 lg:grid-cols-12 md:col-span-8 lg:col-span-9 gap-y-2 lg:gap-x-2">
        {/* Left */}
        <div className="col-span-4">
          <div className="lg:sticky lg:top-[10px]">
            {data.stats && (
              <LeftSideContainer
                categories={data.stats.categories}
                keywords={data.stats.keywords}
              />
            )}
          </div>
        </div>
        {/* main */}
        <div className="col-span-8">
          {data.posts && <PostsContainer posts={data.posts} />}
        </div>
      </div>

      {/* Right */}
      <div className="md:col-span-4 lg:col-span-3  ">
        <div className="md:sticky md:top-[10px]">
          {data.stats && <RightSideContainer count={data.stats.count} />}
        </div>
      </div>
    </div>
  );
}
