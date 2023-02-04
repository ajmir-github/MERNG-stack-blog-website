import Link from "next/link";
import Image from "next/image";
import {
  ThreeDotsVertical,
  Eye,
  Tags,
  Bookmark,
  ChatText,
  ArrowRight,
} from "react-bootstrap-icons";
import { classes } from "../../styles";

export default function PostCard({
  id,
  title,
  category,
  description,
  thumbnail,
  author, //id,name profile
  views,
  keywords,
  createdAt,
}) {
  const editable = 1;
  const authorElement = (
    <>
      {author.profile && (
        <div className="avatar ">
          <div className="w-14 rounded-full ring ring-offset-base-100 ring-offset-1 hover:ring-primary transition-colors">
            <Image
              src={author.profile || "/assets/user.png"}
              width={48}
              height={48}
              alt={author.name}
            />
          </div>
        </div>
      )}
      <div className="grow">
        <h4 className=" text-lg font-bold">{author.name}</h4>
        <p className="text-gray-400 text-md">{createdAt.date}</p>
      </div>
    </>
  );
  return (
    <div
      className={classes(
        "grid grid-cols-1 overflow-hidden gap-2",
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-box shadow-lg"
      )}
    >
      {/* top: user, date, func to edit and delete */}
      <div className="flex w-full items-center justify-end p-4 md:p-6 lg:p-6">
        {author && author.id ? (
          <Link
            className="flex gap-4 grow items-center"
            href={`/user/${author.id}`}
          >
            {authorElement}
          </Link>
        ) : (
          <div className="flex gap-4 grow items-center">{authorElement}</div>
        )}

        {editable && (
          <div>
            <button className="btn btn-circle btn-ghost">
              <ThreeDotsVertical size={18} />
            </button>
          </div>
        )}
      </div>
      {/* middle: image */}
      {thumbnail && (
        <div className="w-full">
          <Image
            src={thumbnail}
            width={400}
            height={400}
            className="w-full aspect-video"
            alt={title}
          />
        </div>
      )}
      {/* bottom: title, desctiption, category, keywords, views */}
      <div className="w-full p-4 md:p-6 flex flex-col gap-2 justify-between">
        {/* Descriptions */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-md text-gray-400">{description}</p>
        </div>

        <div className="flex justify-start items-center gap-2 flex-wrap">
          {category && (
            <Link
              className="btn btn-xs btn-primary flex gap-2"
              href={`/category/${category}`}
            >
              <Bookmark /> {category}
            </Link>
          )}
          {keywords &&
            keywords.map((keyword) => (
              <Link
                key={keyword}
                className="btn btn-xs btn-ghost gap-2"
                href={`/keyword/${keyword}`}
              >
                <Tags size={14} /> {keyword}
              </Link>
            ))}
        </div>

        {/* bottom */}
        <div className="flex gap-2">
          <div className="btn-group grow">
            <Link className="btn btn-ghost gap-4 w-1/2" href={`/post/${id}`}>
              <ArrowRight size={18} /> View
            </Link>
            <Link
              className="btn btn-ghost gap-4 w-1/2"
              href={`/post/${id}#make-comment`}
            >
              <ChatText size={18} />
              Comment
            </Link>
          </div>
          {views && (
            <div className="flex items-center gap-2 text-gray-400">
              <Eye />
              {views}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
