import Link from "next/link";
import { Tags, Bookmark, Tag, Bookmarks } from "react-bootstrap-icons";
import { boxClasses, classes } from "../../styles";

export default function LeftSideContainer({ categories, keywords }) {
  return (
    <div className="grid gap-2">
      {/* categories */}
      <div className={classes("grid gap-2", boxClasses)}>
        <div className="btn btn-primary gap-2 btn-sm">
          <Bookmarks />
          All categories
        </div>
        <div className="flex flex-wrap gap-1">
          {categories.map(({ category, count }) => (
            <Link
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

      {/* categories */}
      <div className={classes("grid gap-2", boxClasses)}>
        <div className="btn gap-2 btn-secondary btn-sm">
          <Tags /> All tags
        </div>
        <div className="flex flex-wrap gap-1">
          {keywords.map(({ keyword, count }) => (
            <Link
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
  );
}
