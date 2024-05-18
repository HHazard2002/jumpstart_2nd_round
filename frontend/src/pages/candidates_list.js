import React, { useEffect, useState } from "react";
import CandidateCard from "../components/candidate_card";
import SavedCandidates from "../components/saved_candidates";
import InterviewRequest from "../components/interview_request";
import emailjs from "emailjs-com";
import { useAirtable } from "../data/candidates.js";

function CandidatesList() {
  const { data: candidates, loading, error } = useAirtable();
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [savedCandidates, setSavedCandidates] = useState(() => {
    // Load candidates from local storage or initialize with default candidates
    const savedCandidates = localStorage.getItem("candidates");
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  const sendEmail = (formData) => {
    const serviceID = "service_il03da8";
    const templateID = "template_n24oymp";
    const userID = "12i-YJ-wSzu1tPQM9";

    savedCandidates.forEach((candidate) => {
      const templateParams = {
        candidate_name: candidate.name,
        name: formData.name,
        company: formData.company,
        email: candidate.email,
        linkedin: formData.linkedin,
        jobDescription: formData.jobDescription,
        additionalInfo: formData.additionalInfo,
        reply_to: formData.email,
      };

      emailjs.send(serviceID, templateID, templateParams, userID).then(
        (response) => {
          console.log(
            `SUCCESS! Email sent to ${candidate.name}`,
            response.status,
            response.text
          );
          setSavedCandidates((prevCandidates) =>
            prevCandidates.filter((c) => c.id !== candidate.id)
          );
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 5000); // Hide the toast after 5 seconds
        },
        (error) => {
          console.log(`FAILED to send email to ${candidate.name}`, error);
        }
      );
    });

    setCreatingRequest(false);
  };

  // Save candidates to local storage whenever the savedCandidates state changes
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const addCandidate = (candidate) => {
    if (!savedCandidates.some((c) => c.id === candidate.id)) {
      setSavedCandidates([...savedCandidates, candidate]);
    }
  };

  const removeCandidate = (candidate) => {
    setSavedCandidates(savedCandidates.filter((c) => c.id !== candidate.id));
  };

  const toggleCandidate = (candidate) => {
    if (savedCandidates.some((c) => c.id === candidate.id)) {
      removeCandidate(candidate);
    } else {
      addCandidate(candidate);
    }
  };

  return (
    <div className="flex justify-center pb-20 bg-white">
      {showToast && (
        <div
          id="toast-success"
          className="fixed top-4 right-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            Emails sent successfully.
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setShowToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="w-1/5 h-auto rounded-lg bg-white mt-5 pl-2 pr-2 flex flex-col items-start min-h-0 sticky top-0">
        {savedCandidates.length === 0 ? (
          <h2 className="pt-5 text-md lg:text-xl">
            Select your first candidate to continue!
          </h2>
        ) : (
          <h2 className="pt-5 text-xl lg:text-3xl">Candidates to interview</h2>
        )}
        {savedCandidates.map((savedCandidate, index) => (
          <SavedCandidates
            key={index}
            savedCandidate={savedCandidate}
            onToggleCandidate={toggleCandidate}
          />
        ))}

        {savedCandidates.length > 0 && (
          <div className="flex flex-col items-center">
            {creatingRequest ? (
              <div className="flex flex-col items-center mt-5">
                <button
                  onClick={() => sendEmail(formData)}
                  style={{
                    backgroundColor: "rgb(0, 242, 194)",
                  }}
                  className="px-6 py-2 text-black rounded-lg font-normal transform hover:-translate-y-1 transition duration-400"
                >
                  Send match request
                </button>
                <span className="text-xs text-gray-500 mt-2">
                  An email will be sent to the selected candidates!
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-5">
                {" "}
                <button
                  onClick={() => setCreatingRequest(true)}
                  style={{
                    backgroundColor: "rgb(0, 242, 194)",
                  }}
                  className="px-6 py-2 text-black rounded-lg font-normal transform hover:-translate-y-1 transition duration-400"
                >
                  Create match request
                </button>
                <span className="text-xs text-gray-500 mt-2">
                  No emails will be sent yet!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {creatingRequest ? (
        <InterviewRequest
          setCreatingRequest={setCreatingRequest}
          setFormData={setFormData}
        />
      ) : (
        <div className="max-w-[1200px] h-auto lg:w-4/5 w-2/3 grid grid-cols-1 ml-5 mr-5 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              candidate={candidate}
              isInList={savedCandidates.some((c) => c.id === candidate.id)}
              onToggleCandidate={toggleCandidate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidatesList;
