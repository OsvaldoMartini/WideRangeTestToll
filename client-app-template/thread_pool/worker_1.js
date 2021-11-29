const { fetch } = require("fetch");

// Access the workerData by requiring it.
const { parentPort, workerData } = require("worker_threads");

// Something you shouldn"t run in main thread
// since it will block.
function jobsToExecute(task) {
  var FetchStream = require("fetch").FetchStream;

  var fetch = new FetchStream("http://google.com");

  fetch.on("data", function (chunk) {
    console.log(task, chunk);
  });

  // (async () => {
  //   const rawResponse = await fetch(
  //     "http://localhost:9095/cxf/ConvenienceCardWebsiteRSServiceCH/checkCardAndMsisdn",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         confirmMobilePhoneNumber: "1",
  //         confirmPrefix: "+22483",
  //         language: "XX",
  //         lastFourDigits: "5555",
  //         mobilePhoneNumber: "1",
  //         partnerId: "AAA5bbb5eD",
  //         prefix: "+1",
  //         serialNumber: "789548785487",
  //       }),
  //     },
  //   );
  //   const content = await rawResponse.json();

  //   console.log(content);
  // })();
}

// Main thread will pass the data you need
// through this event listener.
parentPort.on("message", (param) => {
  if (typeof param !== "number") {
    throw new Error("param must be a number.");
  }

  var startTime = performance.now();
  const result = jobsToExecute(param);
  var endTime = performance.now();
  console.log(`Call to worker took ${endTime - startTime} milliseconds`);

  // Access the workerData.
  console.log("workerData is", workerData);

  // return the result to main thread.
  parentPort.postMessage(result);
});
