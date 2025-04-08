import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** JobList: Shows a list of jobs with optional search input. */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        console.log("Fetched jobs:", jobs);

        // 🚨 Ensure that each job has the required properties (defensive programming)
        const validJobs = jobs.filter(
          (job) => job && job.id && job.title && job.companyName
        );

        setJobs(validJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      const jobs = await JoblyApi.getJobs(searchTerm.trim());
      console.log("Search results:", jobs);

      // 🚨 Ensure valid jobs are returned from search
      const validJobs = jobs.filter(
        (job) => job && job.id && job.title && job.companyName
      );

      setJobs(validJobs);
    } catch (err) {
      console.error("Search error:", err);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="JobList">
      <h1>Jobs</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          name="searchTerm"
          value={searchTerm}
          placeholder="Search jobs..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </form>

      {isLoading ? (
        <p>Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="JobList-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
            />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default JobList;
