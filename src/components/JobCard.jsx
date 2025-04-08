import React from "react";

/** Displays job info and apply button. */
function JobCard({ job, apply }) {
  const handleApply = () => {
    if (typeof apply === "function") {
      apply(job.id);
    }
  };

  return (
    <div className="card">
      <h5>{job.title}</h5>
      <p>
        <b>Salary:</b> {job.salary ? `$${job.salary}` : "N/A"}
      </p>
      <p>
        <b>Equity:</b> {job.equity || "0"}
      </p>
      <button onClick={handleApply} disabled={job.state === "applied"}>
        {job.state === "applied" ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
