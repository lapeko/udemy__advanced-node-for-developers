import https from "https";
import crypto from "crypto";
import {readFile} from "fs";

const url = "https://google.com";
const start = Date.now();

const doRequest = () => {
  https.request(url, (response) => {
    response.on("data", (chunk) => {
    });
    response.on("end", () => {
      console.log("https", Date.now() - start);
    });
  }).end();
};

const doHash = () => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log('1:', Date.now() - start);
  });
};

doRequest();

readFile("multitask.ts", "utf-8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
