import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";
import UserContext from "../UserContext";

function JobList() {
  const { currentUser, applyToJob, hasAppliedToJob } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const result = await JoblyApi.getJobs();
        setJobs(result);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    const result = await JoblyApi.getJobs(searchTerm.trim());
    setJobs(result);
  }

  return (
    <div className="JobList">
      <h1>Jobs</h1>

      <form onSubmit={handleSearch}>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search jobs..."
        />
        <button>Search</button>
      </form>

      <div className="JobList-list">
        {jobs.length ? (
          jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
