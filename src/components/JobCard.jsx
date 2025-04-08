import React, { useContext } from "react";
import UserContext from "../UserContext";

/** JobCard: renders information about a single job. */
function JobCard({ job }) {
  const { hasAppliedToJob, applyToJob, currentUser } = useContext(UserContext);

  const applied = hasAppliedToJob(job.id);

  function handleApply(evt) {
    applyToJob(job.id);
  }

  return (
    <div className="JobCard">
      <h4>{job.title}</h4>
      <p><strong>Company:</strong> {job.companyName || job.companyHandle}</p>
      <p><strong>Salary:</strong> {job.salary ?? "N/A"}</p>
      <p><strong>Equity:</strong> {job.equity ?? "N/A"}</p>

      {currentUser && (
        <button
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      )}
    </div>
  );
}

export default JobCard;
