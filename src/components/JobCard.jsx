import React from "react";

/** JobCard Component
 * Shows basic job info and "Apply" button.
 * Props:
 * - job: { id, title, salary, equity, companyName, state }
 * - apply: function to call when applying to job
 */

function JobCard({ job, apply }) {
  function handleApply(evt) {
    evt.preventDefault();
    if (apply) apply(job.id);
  }

  return (
    <div className="card">
      <h5>{job.title}</h5>
      {job.companyName && <p><b>Company:</b> {job.companyName}</p>}
      {job.salary != null && <p><b>Salary:</b> ${job.salary.toLocaleString()}</p>}
      {job.equity && <p><b>Equity:</b> {job.equity}</p>}

      <button
        className="btn"
        onClick={handleApply}
        disabled={job.state === "applied"}>
        {job.state === "applied" ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
