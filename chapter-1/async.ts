import https from "https";

const url = "https://google.com";

const start = Date.now();

const makeRequest = () => {
  https.request(url, (response) => {
    response.on("data", (chunk) => {
    });
    response.on("end", () => {
      console.log(Date.now() - start);
    });
  }).end();
};

makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
