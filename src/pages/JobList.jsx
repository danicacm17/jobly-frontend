import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** JobList
 * 
 * Displays a list of all jobs. Includes a search bar for filtering jobs
 * by title. Gracefully handles cases where companyName is not available
 * (fallbacks to companyHandle).
 */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all jobs on initial render
  useEffect(() => {
    async function fetchJobs() {
      const fetchedJobs = await JoblyApi.getJobs();
      setJobs(fetchedJobs);
    }
    fetchJobs();
  }, []);

  // Handle job search by title
  async function handleSearch(evt) {
    evt.preventDefault();
    const searchedJobs = await JoblyApi.getJobs(searchTerm.trim());
    setJobs(searchedJobs);
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
            companyName={job.companyName || job.companyHandle} // ✅ fallback added
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default JobList;
