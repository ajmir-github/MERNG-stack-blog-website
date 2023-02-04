import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import PostsContainer from "../../components/PostsContainer";
import { APIs } from "../../services";

export default function Post({ post, comments, relatedPosts }) {
  return (
    <>
      <div>
        <Image src={post.thumbnail} alt={post.title} width={600} height={400} />
        <h1>{post.title}</h1>
        <i>{post.category}</i>
        <p>{post.description}</p>
        <p>{post.body}</p>
      </div>

      <PostsContainer posts={relatedPosts} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { postId } = context.params;
  const { data } = await axios.get(APIs.getSinglePosts + postId);
  return {
    props: data,
  };
}
