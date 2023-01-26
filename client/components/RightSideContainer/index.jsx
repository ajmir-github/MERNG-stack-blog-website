import Link from "next/link";
import { ChatText, People, CardText } from "react-bootstrap-icons";

export default function RightSideContainer({ count }) {
  return (
    <div className="flex flex-col gap-2 ">
      {/* Register */}
      <div className="alert shadow">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">Attention!</h3>
            <div className="text-xs">
              You can be a blogger of this website by signin up
            </div>
          </div>
        </div>
        <div className="flex-none">
          <Link href={"/signup"} className="btn btn-sm btn-info btn-outline">
            Sign up
          </Link>
        </div>
      </div>
      {/* two */}
      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value">{count.users}</div>
          <div className="stat-desc">+12 This month</div>
          <div className="stat-figure text-secondary">
            <People size={32} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Posts</div>
          <div className="stat-value">{count.posts}</div>
          <div className="stat-desc">+100 This month</div>
          <div className="stat-figure text-secondary">
            <CardText size={32} />
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Comments</div>
          <div className="stat-value">{count.comments}</div>
          <div className="stat-desc">+234 This month</div>
          <div className="stat-figure text-secondary">
            <ChatText size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
