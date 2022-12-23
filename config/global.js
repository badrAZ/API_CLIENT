// Node libs
const { _: requestName, ...requestOptions } = require("minimist")(
  process.argv.slice(2)
);
// Configs
const requests = require("./requests");

module.exports = {
  request: {
    name: requestName,
    options: requestOptions,
    current: requests[requestName],
  },
  urls: {
    api: process.env.SERVER_URL,
  },
  resultOutput: require('path').resolve('.', 'result.json')
};
