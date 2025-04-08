import React, { useContext } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../api";

/** JobCard: shows individual job info and handles "Apply" logic */
function JobCard({ id, title, salary, equity, companyName }) {
  const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);

  // 👇 Defensive check
  if (!id || !title) return null;

  const applied = hasAppliedToJob(id);

  async function handleApply(evt) {
    if (applied) return;
    await applyToJob(id);
  }

  return (
    <div className="JobCard">
      <h4>{title}</h4>
      <p>{companyName}</p>
      <p>Salary: {salary !== null ? `$${salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {equity || "None"}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
