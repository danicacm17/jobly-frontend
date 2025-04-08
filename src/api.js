import axios from "axios";

// ✅ Base URL pulled from environment or fallback
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "https://jobly-backend-r8fh.onrender.com";

/** Jobly API class.
 *
 *  Static class for interacting with the backend API.
 *  Centralizes all API requests.
 */
class JoblyApi {
  // Token is set externally after login/signup
  static token;

  /** Generic request method */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token
      ? { Authorization: `Bearer ${JoblyApi.token}` }
      : {};
    const params = method === "get" ? data : {};

    try {
      const res = await axios({ url, method, data, params, headers });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response || err);
      const message = err?.response?.data?.error?.message || "Unknown error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get all companies, optionally filtered by name */
  static async getCompanies(name) {
    const res = await this.request("companies", name ? { name } : {});
    return res.companies;
  }

  /** Get company details by handle */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs, optionally filtered by title */
  static async getJobs(title) {
    const res = await this.request("jobs", title ? { title } : {});
    const validJobs = Array.isArray(res.jobs)
      ? res.jobs.filter((job) => job && job.id)
      : [];
    return validJobs;
  }

  /** Apply to a job */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  /** Login with credentials → returns token */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Register new user → returns token */
  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get current user data */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update profile data */
  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
