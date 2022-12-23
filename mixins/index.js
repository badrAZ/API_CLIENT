// Node libs
const axios = require("axios");
// Configs
const globalConfig = require("../config/global");
// utils
const { waitDelay } = require("../utils");

const FIVE_MINUTES = 5 * 60e3;

function callApi(props, token) {
  return axios({
    method: "GET",
    baseURL: globalConfig.urls.api,
    ...props,
    headers: {
      "Content-Type": "application/json",
      timeout: FIVE_MINUTES,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...props.headers,
    },
  });
}

async function callRequest(
  { options: { getData, ...options }, calls = 1, delay = 0 },
  token,
  dependenciesResult = [],
  requestArgs
) {
  const callFn = () =>
    callApi(
      {
        data: getData?.({
          nCalls: calls,
          dependenciesResult,
          requestArgs,
        }),
        ...options,
      },
      token
    );

  let lastResult;
  while (calls-- !== 0) {
    console.info(' call:', calls)
    try {
      lastResult = await callFn();
    } catch (error) {
      console.error(error?.message)
      continue
    }
    await waitDelay(delay * 1e3);
  }

  return lastResult;
}

module.exports = {
  callApi,
  callRequest,
};
