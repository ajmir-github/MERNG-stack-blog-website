import { useEffect, useState } from "react";
import { Tags, Tag, XCircle } from "react-bootstrap-icons";
import { classes } from "../../styles";

export default function KeywordSelector({ keywords, fetchPosts }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    if (keywords.length > 0)
      fetchPosts({ keywords: selectedKeywords.join(",") });
  }, [selectedKeywords]);
  const hasSelection = selectedKeywords.length > 0;
  const isKeywordSelected = (keyword) => selectedKeywords.includes(keyword);
  const selectKeyword = (keyword) =>
    setSelectedKeywords(
      isKeywordSelected(keyword)
        ? selectedKeywords.filter((w) => w !== keyword)
        : [...selectedKeywords, keyword]
    );
  const clearAll = () => setSelectedKeywords([]);

  return (
    <div
      className={classes(
        "collapse collapse-arrow",
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg",
        hasSelection && "border-primary border-2"
      )}
    >
      <input type="checkbox" className="peer" />
      <div className={classes("collapse-title flex items-center gap-2")}>
        <Tags />
        All keywords
      </div>
      <div className={classes("collapse-content")}>
        <div className="flex flex-wrap gap-1">
          <button
            key="clearAll"
            className={classes("btn btn-xs gap-1 btn-secondary")}
            onClick={clearAll}
            disabled={!hasSelection}
          >
            <XCircle />
            Clear all
          </button>
          {keywords.map(({ keyword, count }) => (
            <button
              key={keyword}
              className={classes(
                "btn btn-xs gap-1",
                isKeywordSelected(keyword) ? "btn-active" : "btn-ghost"
              )}
              onClick={() => selectKeyword(keyword)}
            >
              <Tag />
              {keyword}{" "}
              <span className="badge badge-ghost badge-xs">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
