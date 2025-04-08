import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

/** Show a single job card. Can handle being passed either:
 * - job object via `job` prop (for company detail)
 * - or individual props (for job list)
 */
function JobCard(props) {
  const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  // Allow for flexibility: props can come in either way
  const job = props.job || props;
  const { id, title, salary, equity, companyName } = job;

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
      <h5>{job.title}</h5>
      <p>{job.companyName}</p>
      {job.salary && <div>Salary: ${job.salary}</div>}
      {job.equity && <div>Equity: {job.equity}</div>}
      {applyToJob && (
        <button
          className="btn"
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
