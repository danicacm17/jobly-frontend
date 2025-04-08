// src/pages/JobList.jsx
import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";
import UserContext from "../UserContext";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser, applyToJob } = useContext(UserContext);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const fetchedJobs = await JoblyApi.getJobs();
        const userJobs = new Set(currentUser.applications);
        const jobsWithStatus = fetchedJobs.map((job) =>
          userJobs.has(job.id) ? { ...job, state: "applied" } : job
        );
        setJobs(jobsWithStatus);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, [currentUser]);

  async function handleSearch(evt) {
    evt.preventDefault();
    try {
      const searched = await JoblyApi.getJobs(searchTerm.trim());
      const userJobs = new Set(currentUser.applications);
      const jobsWithStatus = searched.map((job) =>
        userJobs.has(job.id) ? { ...job, state: "applied" } : job
      );
      setJobs(jobsWithStatus);
    } catch (err) {
      console.error("Error searching jobs:", err);
    }
  }

  async function handleApply(jobId) {
    await applyToJob(jobId);
    setJobs((jobs) =>
      jobs.map((j) =>
        j.id === jobId ? { ...j, state: "applied" } : j
      )
    );
  }

  return (
    <div className="JobList">
      <h2>Jobs</h2>

      <form onSubmit={handleSearch}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs..."
        />
        <button>Search</button>
      </form>

      <div className="JobList-list">
        {jobs.length ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              apply={handleApply}
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
