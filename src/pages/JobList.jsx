import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** Lists all jobs with optional search. */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    const jobs = await JoblyApi.getJobs(searchTerm.trim());
    setJobs(jobs);
  }

  return (
    <div className="JobList">
      <h1>Jobs</h1>

      <form onSubmit={handleSearch}>
        <input
          name="searchTerm"
          value={searchTerm}
          placeholder="Search jobs..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </form>

      <div className="JobList-list">
        {jobs.length ? (
          jobs.map((job) => (
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
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;

