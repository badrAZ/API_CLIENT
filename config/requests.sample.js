// configs
module.exports = {
  // sample: {
  //   // axiosParams + getData
  //   options: {
  //     url: "",
  //     method: "GET",
  //     headers: {},
  //     params: {}, // query strings
  //     data: {}, // body
  //     getData: (callIndex, ...dependenciesResult) => {},
  //     timeout: 0, // ms
  //   },
  //   dependencies: [], // list of requests dependencies
  //   calls: 1, // nCalls
  //   delay: 0, // the duration between two calls in sec
  //   needAuth: true, // requires authentication
  // },
  auth: {
    options: {
      url: "/login_check",
      method: "POST",
      data: require("./auth").credentials,
    },
    needAuth: false,
  }
};
