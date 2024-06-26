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
      <div className="pt-2 flex flex-col flex-grow justify-between">
        <a href="#">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {candidate.name}
              </h5>
              <img
                src={linkedin}
                alt={candidate.name}
                title="Linkedin icon"
                className="h-5 w-5 ml-2"
                onClick={() => {
                  window.open(candidate.linkedin, "_blank");
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <h5 className="text-md tracking-tight text-gray-900 dark:text-white">
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
          <p className="font-bold">
            {(() => {
              const educationText = candidate.education[0];
              console.log("Education Text:", educationText);
              if (educationText.includes("; ")) {
                const splitText = educationText.split("; ")[1];
                console.log("After Semicolon:", splitText);
                return splitText;
              }
              return educationText;
            })()}
          </p>
        </div>
        <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
          {candidate.description}
        </p>

        <div className="mt-auto">
          {isInList ? (
            <div className="flex items-center justify-between">
              <button
                onClick={() => onToggleCandidate(candidate)}
                className="px-6 py-2 mb-4 bg-red-500 text-white rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
              >
                Remove from the list
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={() => onToggleCandidate(candidate)}
                className="px-6 py-2 mb-4 bg-black text-black rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
                style={{
                  backgroundColor: "rgb(0, 242, 194)",
                }}
              >
                Select for an interview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
