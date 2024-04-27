import React from "react";
import "./styles/style.css";
export default function DashboardNavbar() {
  return (
    <ul className="dashboardNavbar flex items-center justify-end gap-5 py-5 px-[5vw]">
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          color="#b0b8c0"
        >
          <path
            fill="#000"
            d="M8.352 20.242A4.63 4.63 0 0 0 12 22a4.63 4.63 0 0 0 3.648-1.758a27.158 27.158 0 0 1-7.296 0"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M18.75 9.704V9c0-3.866-3.023-7-6.75-7S5.25 5.134 5.25 9v.704c0 .845-.24 1.671-.692 2.374L3.45 13.801c-1.011 1.574-.239 3.713 1.52 4.21a25.794 25.794 0 0 0 14.06 0c1.759-.497 2.531-2.636 1.52-4.21l-1.108-1.723a4.394 4.394 0 0 1-.693-2.374M12 5.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75"
            clip-rule="evenodd"
          />
        </svg>
      </li>
      <li>
        <img
          src="https://avatars.githubusercontent.com/u/135448616?v=4&size=40"
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
      </li>
    </ul>
  );
}
