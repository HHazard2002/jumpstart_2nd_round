import React, { useEffect, useState } from "react";

function SavedCandidates({ savedCandidate, onToggleCandidate }) {
  return (
    <div className="max-h-[110px] max-w-sm mx-auto mt-2 pt-2  bg-white rounded-lg  dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex w-full">
      <a href="#">
        <img
          className="w-16 h-16 mb-2 object-cover rounded-lg"
          src={savedCandidate.image}
          alt="Descriptive alt text"
        />
      </a>
      <div className="pt-2 pl-2 flex flex-col flex-grow">
        <a href="#">
          <div className="flex items-center">
            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
              {savedCandidate.name}
            </h5>
          </div>
        </a>
        <div className=" flex flex-wrap">
          {savedCandidate.roles.map((role, index) => (
            <span
              key={index}
              className="inline-flex mr-2 mb-2 items-center gap-x-1.5 rounded-md bg-purple-100 px-2 py-1 text-xs md:text-xs font-medium text-purple-700"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedCandidates;
