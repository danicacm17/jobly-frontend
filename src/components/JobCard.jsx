import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";

/** Show a single job card with apply functionality */
function JobCard({ id, title, salary, equity, companyName }) {
  const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (currentUser && hasAppliedToJob) {
      setApplied(hasAppliedToJob(id));
    }
  }, [id, currentUser, hasAppliedToJob]);

  async function handleApply() {
    if (hasAppliedToJob(id)) return;
    await applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="card">
      <h5>{title}</h5>
      <p><b>{companyName}</b></p>
      {salary && <p>Salary: ${salary.toLocaleString()}</p>}
      {equity && <p>Equity: {equity}</p>}
      <button
        className="btn btn-primary"
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
