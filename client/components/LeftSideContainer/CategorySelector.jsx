import { useEffect, useState } from "react";
import { Bookmark, Bookmarks, XCircle } from "react-bootstrap-icons";
import { classes } from "../../styles";

export default function CategorySelector({ categories, fetchPosts }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (hasSelection) fetchPosts({ category: selectedCategory });
  }, [selectedCategory]);
  const hasSelection = selectedCategory !== "";
  const isSelected = (keyword) => keyword === selectedCategory;
  const selectKeyword = (keyword) => setSelectedCategory(keyword);
  const clearAll = () => setSelectedCategory("");
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
        <Bookmarks />
        Categories
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
            Clear
          </button>
          {categories.map(({ category, count }) => (
            <button
              key={category}
              className={classes(
                "btn btn-xs gap-1",
                isSelected(category) ? "btn-active" : "btn-ghost"
              )}
              onClick={() => selectKeyword(category)}
            >
              <Bookmark />
              {category}{" "}
              <span className="badge badge-ghost badge-xs">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
