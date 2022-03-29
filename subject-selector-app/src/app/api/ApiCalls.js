import axios from "axios";

var https = require("http");

let instanceAxios = {};
let axiosAgent = {};
let requests = [];

let CUSTOMER_API_URL = process.env.REACT_APP_API_URL ?? "";
let certificate = process.env.API_CERT ?? false;

export const getRestApiConfig = (
  uri,
  method,
  headerDetails,
  payload,
  timeoout,
) => {
  let objReq = {
    baseURL: CUSTOMER_API_URL + `${uri}`,
  };

  axiosAgent = new https.Agent({
    //enableTrace: true,ss
    requestCert: true,
    rejectUnauthorized: false,
    keepAlive: true,
    // key: fs.readFileSync('')
    // ca: fs.readFileSync('')
    // cert: fs.readFileSync('')
  });

  instanceAxios = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
      httpsAgent: axiosAgent,
    }),
  });

  // instanceAxios.defaults.headers.common["User-Agent"] = "Axios 0.21.1";
  instanceAxios.defaults.headers.common["Content-Type"] = "application/json";

  let options = {};

  if (method === "GET" && !certificate) {
    options = {
      url: objReq.baseURL,
      method: method,
      headers: {
        //  "User-Agent": "Axios 0.21.1",
        "X-Requested-with": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    };
  } else if (method === "GET" && certificate) {
    options = {
      url: objReq.baseURL,
      method: method,
      httpsAgent: axiosAgent,
      withCredentials: true,
      headers: {
        // "User-Agent": "Axios 0.21.1",
        "X-Requested-with": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    };
  }

  return options;
};

export const getSubjectSearch = (requests, operation, callData) => {
  //  (async () => {
  if (CUSTOMER_API_URL) {
    let startPoint = performance.now();

    const tasks = requests.map((options) =>
      instanceAxios.get(options.url, {
        ...options,
        _startRequest: performance.now(),
      }),
    );

    let dataResult = {
      status: "loading",
      payload: null,
    };

    const responses = Promise.allSettled(tasks)
      .then((result) => {
        let endRequest = performance.now();
        const checkPoint = endRequest - startPoint;
        let timeSpend = milliTotime(checkPoint);
        console.log(
          `Time response: -> ${operation} -> Execution time: ${timeSpend}`,
        );

        result.forEach((item) => {
          if (item.status === "fulfilled") {
            dataResult = {
              ...dataResult,
              status: "loaded",
              payload: item.value.data,
            };
          } else if (item.status === "rejected") {
            dataResult = {
              ...dataResult,
              status: "failled",
              payload: item.reason.response,
            };
          }
        });

        // } else {
        //   dataResult = { status: "failled", payload: "URI not defined!" };
        // }
        console.log("getSubjectSearch Internal: ", dataResult);
        callData(
          dataResult.payload.map((item) => {
            const obj = {};
            Object.keys(item).forEach(
              (key) => (obj[key.toUpperCase()] = item[key]),
            );
            return obj;
          }),
        );
        return dataResult;
      }) // Then ["Resolved!", "Rejected!"]
      .catch((err) => console.log("Catch", err));
  }
  // })();
};

function milliTotime(duration) {
  var milliseconds = parseInt(duration % 1000),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
