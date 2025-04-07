import { Link } from "react-router-dom";

/** Summary view of a single company (used in CompanyList) */
function CompanyCard({ company }) {
  return (
    <Link to={`/companies/${company.handle}`} className="CompanyCard">
      <div className="card">
        <h3>{company.name}</h3>
        <p>{company.description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
