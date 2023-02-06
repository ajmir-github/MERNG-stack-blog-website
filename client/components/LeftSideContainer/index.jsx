import { useEffect } from "react";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import KeywordSelector from "./KeywordSelector";
import SearchBox from "./SearchBox";

export default function LeftSideContainer({
  categories,
  keywords,
  fetchPosts,
}) {
  return (
    <div className="grid gap-y-2">
      <SearchBox fetchPosts={fetchPosts} />
      {categories && (
        <CategorySelector categories={categories} fetchPosts={fetchPosts} />
      )}
      {keywords && (
        <KeywordSelector keywords={keywords} fetchPosts={fetchPosts} />
      )}
    </div>
  );
}
