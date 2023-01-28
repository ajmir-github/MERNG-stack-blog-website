import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import { client } from "../../ApolloClientProvider";

const postQuery = gql`
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

export default function Post({ post, error, errors }) {
  return (
    <>
      <Image src={post.thumbnail} alt={post.title} width={600} height={400} />
      <h1>{post.title}</h1>
      <i>{post.category}</i>
      <p>{post.description}</p>
      <p>{post.body}</p>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await client.query({
      query: postQuery,
      variables: {
        id: context.params.postId,
      },
    });

    return {
      props: {
        ...data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Server failed!",
      },
    };
  }
}
