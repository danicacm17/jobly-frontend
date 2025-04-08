import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** Lists all jobs with search functionality. */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const fetchedJobs = await JoblyApi.getJobs();
      setJobs(fetchedJobs);
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    const fetchedJobs = await JoblyApi.getJobs(searchTerm.trim());
    setJobs(fetchedJobs);
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
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
