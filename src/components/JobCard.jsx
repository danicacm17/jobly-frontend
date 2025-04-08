import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../api";

/** JobCard: Shows info about a job and handles applying */
function JobCard({ job }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.applications) {
      const hasApplied = currentUser.applications.includes(job.id);
      setApplied(hasApplied);
      console.log(`🔍 Job ${job.id} applied:`, hasApplied);
    }
  }, [currentUser, job.id]);

  async function handleApply() {
    if (applied) return;

    await JoblyApi.applyToJob(currentUser.username, job.id);
    setApplied(true);

    setCurrentUser(user => ({
      ...user,
      applications: [...user.applications, job.id]
    }));
  }

  return (
    <div className="JobCard card">
      <h4>{job.title}</h4>
      <p>Salary: {job.salary ?? "N/A"}</p>
      <p>Equity: {job.equity ?? "0"}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
