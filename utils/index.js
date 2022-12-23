// Node libs
const ora = import("ora"); // ora only support ESM modules
const { Readable } = require("node:stream");

const getCurrentDate = () => new Date().toISOString();

function waitDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function loader(fn, text) {
  const spinner = (await ora)
    .default({
      text,
      spinner: "soccerHeader",
    })
    .start();
  const result = await fn();
  spinner.stop();
  return result;
}

function createReadableStream(data) {
  return new Readable({
    read() {
      this.push(JSON.stringify(data, null, 2)); // send data when the consomuer want data
      this.push(null); // notify the end of the stream
    },
  });
}

module.exports = {
  createReadableStream,
  getCurrentDate,
  loader,
  waitDelay,
};
