import axios from "axios";

const TOKEN = ""; /** PUT HERE YOUR SHIPPYPRO PRO TOKEN  */
const apiCall = (url) => {
  return new Promise(async (res, rej) => {
    try {
      const resp = await axios({
        method: "GET",
        url: `https://recruitment.shippypro.com/flight-engine/api/${url}`,
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (resp.status === 200) {
        res(resp.data.data);
      } else {
        const error = new Error("Something went wrong");
        error.statusCode = resp.status;
        rej(error);
      }
    } catch (err) {
      rej(err);
    }
  });
};

export default apiCall;
