import React, { useEffect, useState } from "react";
import CandidateCard from "../components/candidate_card";

function CandidatesList() {
  return (
    <div className="overflow-x-hidden">
      <CandidateCard />
    </div>
  );
}

export default CandidatesList;
