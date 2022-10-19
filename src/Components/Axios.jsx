import axios from "axios";

const Axios = axios.create({
  baseURL: "https://kalpatarungo.org/api_v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
