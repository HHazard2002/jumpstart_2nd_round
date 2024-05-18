import React, { useState } from "react";
import emailjs from "emailjs-com";
import SavedCandidates from "../components/saved_candidates";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function InterviewRequest() {
  const navigate = useNavigate();

  const [savedCandidates, setSavedCandidates] = useState(() => {
    // Load candidates from local storage or initialize with default candidates
    const savedCandidates = localStorage.getItem("candidates");
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });
  const [formData, setLocalFormData] = useState({
    name: "",
    company: "",
    email: "",
    linkedin: "",
    jobDescription: "",
    additionalInfo: "",
    file: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const toggleCandidate = (candidate) => {
    if (savedCandidates.some((c) => c.id === candidate.id)) {
      removeCandidate(candidate);
    } else {
      addCandidate(candidate);
    }
  };

  const addCandidate = (candidate) => {
    if (!savedCandidates.some((c) => c.id === candidate.id)) {
      setSavedCandidates([...savedCandidates, candidate]);
    }
  };

  const removeCandidate = (candidate) => {
    setSavedCandidates(savedCandidates.filter((c) => c.id !== candidate.id));
  };

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setLocalFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.company) errors.company = "Company name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.linkedin) errors.linkedin = "LinkedIn profile is required";
    if (!formData.jobDescription)
      errors.jobDescription = "Job description is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const serviceID = "service_il03da8";
    const templateID = "template_n24oymp";
    const userID = "12i-YJ-wSzu1tPQM9";

    let emailPromises = savedCandidates.map((candidate) => {
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

      return emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then((response) => {
          console.log(
            `SUCCESS! Email sent to ${candidate.name}`,
            response.status,
            response.text
          );
        })
        .catch((error) => {
          console.log(`FAILED to send email to ${candidate.name}`, error);
        });
    });

    Promise.all(emailPromises).then(() => {
      localStorage.setItem("candidates");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000); // Hide the toast after 5 seconds
      navigate("/candidates");
    });
  };

  return (
    <div className="flex justify-center pb-20 bg-white">
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

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mt-5">
            <button
              onClick={(e) => handleSubmit(e)}
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
        </div>
      </div>
      <div className="overflow-x-hidden max-w-[1200px] lg:w-4/5 w-2/3 ml-5 mr-5 p-5">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <button
                type="button"
                onClick={() => navigate("/candidates")}
                className="pt-6"
              >
                ← Back to Preview
              </button>
              <h2 className="text-4xl pt-5 font-semibold leading-7 text-gray-900">
                Submit match request to your selected candidates
              </h2>
              <p className="mt-1 pt-2 text-sm leading-6 text-gray-600">
                We need a bit of information about you so that we can request
                introduction with your selected candidates.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your name
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {formErrors.name && (
                      <p className="text-red-600 text-sm">{formErrors.name}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your company's name
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="JumpStart"
                        value={formData.company}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {formErrors.company && (
                      <p className="text-red-600 text-sm">
                        {formErrors.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your email address
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="john.smith@yourcompany.com"
                        value={formData.email}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {formErrors.email && (
                      <p className="text-red-600 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your Linkedin profile
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="https://www.linkedin.com/johnsmith/"
                        value={formData.linkedin}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {formErrors.linkedin && (
                      <p className="text-red-600 text-sm">
                        {formErrors.linkedin}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Link to job description
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="jobDescription"
                        id="jobDescription"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="https://www.yourcompany.com/job-description"
                        value={formData.jobDescription}
                        onChange={handleChange}
                      ></input>
                    </div>
                    {formErrors.jobDescription && (
                      <p className="text-red-600 text-sm">
                        {formErrors.jobDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Additional information
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows="3"
                      className="block w-full pl-2 rounded-md bg-transparent border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Additional information"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Spotlight
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span className="m-2">Upload a file</span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          ></input>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InterviewRequest;
