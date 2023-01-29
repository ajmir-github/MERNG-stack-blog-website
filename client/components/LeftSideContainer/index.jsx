import Link from "next/link";
import { Tags, Bookmark, Tag, Bookmarks } from "react-bootstrap-icons";
import { boxClasses, classes } from "../../styles";

export default function LeftSideContainer({ categories, keywords }) {
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
        />
      </div>

      {/* categories */}

      <div
        className={classes(
          "collapse collapse-arrow",
          "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
        )}
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title  peer-checked:bg-primary peer-checked:text-secondary-content flex items-center gap-2">
          <Bookmarks />
          All categories
        </div>
        <div className="collapse-content  peer-checked:bg-primary peer-checked:text-secondary-content">
          <div className="flex flex-wrap gap-1">
            {categories.map(({ category, count }) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="btn btn-ghost btn-xs gap-1"
              >
                <Bookmark />
                {category}{" "}
                <span className="badge badge-ghost badge-xs">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Keyword */}

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
