import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** Lists all jobs with a search bar */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const result = await JoblyApi.getJobs();
      setJobs(result);
    }
    fetchJobs();
  }, []);

  /** Handle job search form submit */
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
          name="searchTerm"
          value={searchTerm}
          placeholder="Search jobs..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </form>

      {jobs.length ? (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default JobList;
