import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

/** Show a single job card.
 * Works for both:
 * - passed job object via `job` prop (company detail)
 * - or individual props (job list)
 */
function JobCard(props) {
  const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

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
      <h4>{title}</h4>
      {companyName && <p>{companyName}</p>}
      {salary !== null && <p>Salary: ${salary.toLocaleString()}</p>}
      {equity !== null && <p>Equity: {equity}</p>}
      {applyToJob && (
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
