import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const postQuery = gql`
  query Post($id: ID!) {
    post(postId: $id) {
      _id
      title
    }
  }
`;

export default function Test() {
  const { loading, error, data } = useQuery(postQuery, {
    variables: { id: "63cd819d0a76e2fe10f97151" },
  });
  useEffect(() => {
    if (error) return console.log(error);
    console.log(data);
  }, [loading]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Test</h1>
    </>
  );
}
