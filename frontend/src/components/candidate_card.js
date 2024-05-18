import React from "react";
import linkedin from "../images/linkedin-logo.png";
import cv from "../images/cv.png";

function CandidateCard({ candidate, isInList, onToggleCandidate }) {
  return (
    <div className="max-w-m mx-auto mt-5 pt-4 pr-4 pl-4 bg-white rounded-lg  dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col h-full hover:drop-shadow-lg transition duration-400">
      <a href="#">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={candidate.image}
          alt="Descriptive alt text"
        />
      </a>
      <div className="pt-2 flex flex-col flex-grow">
        <a href="#">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {candidate.name}
            </h5>
            <h5 className="text-md font- tracking-tight text-gray-900 dark:text-white">
              {candidate.salary}
            </h5>
          </div>
        </a>
        <div className="mt-2">
          {candidate.roles.map((role, index) => (
            <span
              key={index}
              className="inline-flex mr-2 items-center gap-x-1.5 rounded-md bg-purple-100 px-2 py-1 text-sm md:text-md font-medium text-purple-700"
            >
              {role}
            </span>
          ))}
        </div>
        <div className="mt-2 mb-2">
          {candidate.education.slice(-1).map((education, index) => (
            <p key={index} className="font-bold">
              {education}
            </p>
          ))}
        </div>
        <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
          {candidate.description}
        </p>
        <div className="flex items-center ">
          <img src={cv} title="CV icons" className="h-10 w-10"></img>
          <img
            src={linkedin}
            title="Linkedin icons"
            className="h-10 w-10"
          ></img>
        </div>

        <div className="mt-auto">
          {isInList ? (
            <button
              onClick={() => onToggleCandidate(candidate)}
              className="px-6 py-2 mb-4 bg-red-500 text-white rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
            >
              Remove from the list
            </button>
          ) : (
            <button
              onClick={() => onToggleCandidate(candidate)}
              className="px-6 py-2 mb-4 bg-black text-black rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
              style={{
                backgroundColor: "rgb(0, 242, 194)",
              }}
            >
              Select for an interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
