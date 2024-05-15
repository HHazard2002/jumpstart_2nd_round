import React, { useEffect, useState } from "react";
import image from "../images/imagess_3.jpeg";
import image1 from "../images/image1.jpg";

function CandidatePage() {
  return (
    <div class="max-w-xl mx-auto mt-5 pt-4 pr-4 pl-4 bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <a href="#">
        <img
          class="w-full h-64 object-cover  rounded-lg"
          src={image1}
          alt="Descriptive alt text"
        />
      </a>
      <div class="pt-2 pb-5">
        <a href="#">
          <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Name
          </h5>
        </a>
        <span className=" top-0 right-0">
          <span className="inline-flex mr-2 items-center gap-x-1.5 rounded-md bg-indigo-100 px-2 py-1 text-sm md:text-md font-medium text-indigo-700">
            Roles suitable for
          </span>
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-2 py-1 text-sm md:text-md font-medium text-indigo-700">
            Roles suitable for
          </span>
        </span>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Something they're proud of
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default CandidatePage;
