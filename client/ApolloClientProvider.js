import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export const getPosts = gql`
  query GetPosts($limit: Int!, $offset: Int!, $search: String) {
    posts(limit: $limit, offset: $offset, search: $search) {
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
  }
`;

export const getSinglePost = gql`
  query Post($id: ID!) {
    post(postId: $id) {
      _id
      title
      category
      description
      thumbnail
      body
      published
      createdAt
      updatedAt
      views
    }
  }
`;

export const getStats = gql`
  query GetStats {
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

export const getPostsWithStatsQuery = gql`
  {
    posts {
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
    stats {
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
