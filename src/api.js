import axios from "axios";

// ✅ Production-ready base URL
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "https://jobly-backend-r8fh.onrender.com";

/** API Class.
 * Static class tying together methods used to get/send to the API.
 */
class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  static async getCompanies(name) {
    const res = await this.request("companies", name ? { name } : {});
    return res.companies;
  }

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(title) {
    const res = await this.request("jobs", title ? { title } : {});
    return res.jobs;
  }

  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
