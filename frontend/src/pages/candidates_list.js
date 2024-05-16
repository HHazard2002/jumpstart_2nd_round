import React, { useEffect, useState } from "react";
import CandidateCard from "../components/candidate_card";
import image4 from "../images/image4.jpg";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import SavedCandidates from "../components/saved_candidates";
import InterviewRequest from "../components/interview_request";
import emailjs from "emailjs-com";

function CandidatesList() {
  const candidates = [
    {
      id: 1,
      name: "Alice",
      image: image4,
      roles: ["Founder Associate", "Operations"],
      salary: "£50k",
      education: [
        "BA in Philosophy, Politics and Economics @ Oxford University (2021)",
        "MSc in Sociology (Distinction) @ Oxford University",
      ],
      description:
        "Recipient of the A.H Halsey Prize for outstanding performance in the Sociology Master's degree program.",
      email: "hhazard2002@gmail.com",
    },
    {
      id: 2,
      name: "Bob",
      image: image1,
      roles: ["Founder Associate", "Operations"],
      salary: "£30-40k",
      education: ["BA in Economics (1st Class) @ Cambridge University (2021)"],
      description:
        "Developed and implemented an effective online pricing strategy for the apparel brand 'Threadbare', resulting in the brand's website transitioning from a loss-making venture to a profitable one.",
      email: "hhazard2002@gmail.com",
    },
    {
      id: 3,
      name: "Charlie",
      image: image2,
      roles: ["Founder Associate", "Operations"],
      salary: "£45-60k",
      education: ["BA in Music (1st Class) @ Oxford University"],
      description:
        "Walking 57km from Eastbourne to Brighton for Harry's HAT charity last year!",
      email: "hhazard2002@gmail.com",
    },
    {
      id: 4,
      name: "Alice",
      image: image4,
      roles: ["Founder Associate", "Operations"],
      salary: "£50k",
      education: [
        "BA in Philosophy, Politics and Economics @ Oxford University (2021)",
        "MSc in Sociology (Distinction) @ Oxford University",
      ],
      description:
        "Recipient of the A.H Halsey Prize for outstanding performance in the Sociology Master's degree program.",
      email: "hhazard2002@gmail.com",
    },
    {
      id: 5,
      name: "Bob",
      image: image1,
      roles: ["Founder Associate", "Operations"],
      salary: "£30-40k",
      education: ["BA in Economics (1st Class) @ Cambridge University (2021)"],
      description:
        "Developed and implemented an effective online pricing strategy for the apparel brand 'Threadbare', resulting in the brand's website transitioning from a loss-making venture to a profitable one.",
      email: "hhazard2002@gmail.com",
    },
    {
      id: 6,
      name: "Charlie",
      image: image2,
      roles: ["Founder Associate", "Operations"],
      salary: "£45-60k",
      education: ["BA in Music (1st Class) @ Oxford University"],
      description:
        "Walking 57km from Eastbourne to Brighton for Harry's HAT charity last year!",
      email: "hhazard2002@gmail.com",
    },
    // more users
  ];
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [formData, setFormData] = useState(null);

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
      console.log(templateParams);

      emailjs.send(serviceID, templateID, templateParams, userID).then(
        (response) => {
          console.log(
            `SUCCESS! Email sent to ${candidate.name}`,
            response.status,
            response.text
          );
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
      <div className="w-1/5 h-auto rounded-lg bg-white mt-5 pl-2 pr-2 flex flex-col items-center min-h-0 sticky top-0">
        <h2 className="pt-5 text-xl  lg:text-3xl">Candidates to interview</h2>
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
