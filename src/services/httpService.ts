import axios from "axios";
import { HttpService } from "../application/ports";

export const httpService: HttpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
