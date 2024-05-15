import React, { useEffect, useState } from "react";
import CandidateCard from "../components/candidate_card";
import image4 from "../images/image4.jpg";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";

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
    },
    // more users
  ];
  return (
    <div className="overflow-x-hidden flex justify-center pb-20">
      <div className="max-w-[1200px] justify-center item-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

export default CandidatesList;
