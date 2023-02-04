import { useEffect } from "react";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import KeywordSelector from "./KeywordSelector";
import SearchBox from "./SearchBox";

export default function LeftSideContainer({ categories, keywords, filter }) {
  const [madeRequest, setMadeRequest] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const generateQueries = () => {
    let queries = [];
    // search
    if (search) queries.push(`title:like:${search}`);
    // Keywords
    if (selectedCategory.length > 0)
      queries.push(`category:in:${selectedCategory.join(",")}`);
    // Keywords
    if (selectedKeywords.length > 0)
      queries.push(`keywords:has:${selectedKeywords.join(",")}`);

    if (queries.length > 0) {
      setMadeRequest(true);
      filter(queries.join(":and:"));
    } else {
      if (madeRequest) filter(null);
    }
  };

  useEffect(generateQueries, [selectedKeywords, selectedCategory, search]);

  return (
    <div className="grid gap-y-2">
      <SearchBox setSearch={setSearch} />
      {categories && (
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {keywords && (
        <KeywordSelector
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
        />
      )}
    </div>
  );
}
