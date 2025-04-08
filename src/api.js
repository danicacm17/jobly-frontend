import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** JoblyApi: class with static methods to interact with backend API */
class JoblyApi {
  // Auth token set on login/signup
  static token;

  /** Generic request method */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get list of jobs (filtered by title if provided) */
  static async getJobs(title) {
    const res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Get list of companies (filtered by name if provided) */
  static async getCompanies(name) {
    const res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details of a specific company by handle */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Login: returns token */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Signup: returns token */
  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get current user info by username */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update current user's profile */
  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply to a job for the current user */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }
}

export default JoblyApi;
