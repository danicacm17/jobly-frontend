import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../components/JobCard";

/** Detail view for a single company and its jobs */
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      const result = await JoblyApi.getCompany(handle);
      setCompany(result);
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      <h3>Jobs at {company.name}</h3>
      {company.jobs.length ? (
        company.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default CompanyDetail;
