import { useContext } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../api";

/** Summary view of a single job (used in JobList and CompanyDetail) */
function JobCard({ job }) {
  const { currentUser, hasAppliedToJob, applyToJob } = useContext(UserContext);

  const hasApplied = hasAppliedToJob(job.id);

  async function handleApply(evt) {
    evt.preventDefault();
    if (hasApplied) return;
    await applyToJob(job.id);
  }

  return (
    <div className="JobCard card">
      <h3>{job.title}</h3>
      <p>Salary: {job.salary || "N/A"}</p>
      <p>Equity: {job.equity || "0"}</p>
      <p>Company: {job.companyName || job.companyHandle}</p>

      {currentUser && (
        <button
          className="apply-btn"
          onClick={handleApply}
          disabled={hasApplied}
        >
          {hasApplied ? "Applied" : "Apply"}
        </button>
      )}
    </div>
  );
}

export default JobCard;
