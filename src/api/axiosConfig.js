import axios from "axios";

axios.defaults.baseURL =
  window.location.protocol + "//" + window.location.hostname + ":3001/api/v1";
axios.defaults.responseType = "json";
axios.defaults.headers.get["Accept"] = "application/json"; // default header for all get request
axios.defaults.headers.post["Accept"] = "application/json"; // default header for all POST request
//без этого заголовка не будет обновляться страница в IE
axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

axios.defaults.withCredentials = true;

export default axios;
