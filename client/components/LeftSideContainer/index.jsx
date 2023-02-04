import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tags, Bookmark, Tag, Bookmarks } from "react-bootstrap-icons";
import useInputDebounce from "../../hooks/useInputDebounce";
import { boxClasses, classes } from "../../styles";

function WordSelector({ words }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categorySelected = selectedCategories.length > 0;
  const selectCategory = (category) => {
    if (isCategorySelected(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const isCategorySelected = (category) =>
    selectedCategories.includes(category);
  return (
    <div
      className={classes(
        "collapse collapse-arrow",
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
      )}
    >
      <input type="checkbox" className="peer" />
      <div
        className={classes(
          "collapse-title flex items-center gap-2",
          categorySelected && "text-primary"
        )}
      >
        <Bookmarks />
        {categorySelected ? "Selected" : "All categories"}
      </div>
      <div className={classes("collapse-content")}>
        <div className="flex flex-wrap gap-1">
          {words.map(({ category, count }) => (
            <button
              key={category}
              className={classes(
                "btn btn-xs gap-1",
                isCategorySelected(category) ? "btn-primary" : "btn-active"
              )}
              onClick={() => selectCategory(category)}
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

export default function LeftSideContainer({
  categories,
  keywords,
  searchPosts,
}) {
  const router = useRouter();
  const onChangeFunc = useInputDebounce(searchPosts);

  return (
    <div className="grid gap-y-2">
      {/* Search */}
      <div
        className={classes(
          "w-full p-2",
          "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
        )}
      >
        <input
          type="text"
          placeholder="Search here..."
          className="input bg-transparent input-bordered w-full"
          onChange={onChangeFunc}
        />
      </div>

      {/* categories */}
      <WordSelector words={categories} />

      {/* Tags */}
      <div
        className={classes(
          "collapse collapse-arrow",
          "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
        )}
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title  peer-checked:bg-primary peer-checked:text-secondary-content flex items-center gap-2">
          <Tags /> All tags
        </div>
        <div className="collapse-content  peer-checked:bg-primary peer-checked:text-secondary-content">
          <div className="flex flex-wrap gap-1">
            {keywords.map(({ keyword, count }) => (
              <Link
                key={keyword}
                href={`/keyword/${keyword}`}
                className="btn btn-ghost btn-xs gap-1"
              >
                <Tag />
                {keyword}{" "}
                <span className="badge badge-ghost badge-xs">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
