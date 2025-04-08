import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import CompanyCard from "../components/CompanyCard";

/** Lists all companies with search functionality. */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    fetchCompanies();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    const companies = await JoblyApi.getCompanies(searchTerm.trim());
    setCompanies(companies);
  }

  return (
    <div className="CompanyList">
      <h2>Companies</h2>

      <form onSubmit={handleSearch}>
        <input
          name="searchTerm"
          value={searchTerm}
          placeholder="Search companies..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </form>

      <div className="CompanyList-list">
        {companies.map((company) => (
          <CompanyCard key={company.handle} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
