import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** JobList: displays all available jobs */
function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  return (
    <div className="JobList">
      <h1>Jobs</h1>
      {jobs.length ? (
        jobs.map(job => <JobCard key={job.id} job={job} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default JobList;
