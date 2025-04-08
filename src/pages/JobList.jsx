import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** Displays list of all jobs with optional search bar. */
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
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;
