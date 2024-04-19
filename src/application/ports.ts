import axios from "axios";

export interface HttpService {
  get: typeof axios.get;
  post: typeof axios.post;
  put: typeof axios.put;
  patch: typeof axios.patch;
  delete: typeof axios.delete;
}
