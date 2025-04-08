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
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    try {
      const searched = await JoblyApi.getJobs(searchTerm.trim());
      setJobs(searched);
    } catch (err) {
      console.error("Error searching jobs:", err);
    }
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
              apply={applyToJob}
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
