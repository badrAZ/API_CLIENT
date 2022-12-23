#!/usr/bin/env node

// Node libs
require("dotenv").config();
const assert = require("assert");
// Node modules
const { callRequest } = require("./mixins");
// Configs
const globalConfig = require("./config/global");
const requests = require("./config/requests");
// Utils
const { loader, createReadableStream } = require("./utils");

// ---------------------------------------------------------------

function assertAppState() {
  const { name, current } = globalConfig.request;
  assert(name !== undefined);
  assert(current !== undefined);
}

async function auth() {
  const { needAuth = true } = globalConfig.request.current;
  if (!needAuth) {
    return;
  }
  const result = await callRequest(requests.auth);
  return result.data.token;
}

function callDependencies(token) {
  const { dependencies = [] } = globalConfig.request.current;
  if (dependencies.length === 0) {
    return;
  }
  return Promise.all(
    dependencies.map((dependencyName) => {
      const request = requests[dependencyName];
      const { needAuth = true } = request
      return callRequest(request, needAuth ? token : undefined);
    })
  );
}

function callCurrentRequest(token, dependenciesResult) {
  const { current, options: requestArgs } = globalConfig.request;
  const { needAuth = true } = current;
  return callRequest(
    current,
    needAuth ? token : undefined,
    dependenciesResult,
    requestArgs
  );
}

// ---------------------------------------------------------------

async function main() {
  // help
  if (globalConfig.request.options.h) {
    return console.log(Object.keys(requests).join("\n"));
  }

  // check app state
  await loader(assertAppState, "Assert app state");

  // auth if required
  const token = await loader(auth, "Auth");

  // call dependencies if exist
  const dependenciesResult = await loader(
    () => callDependencies(token),
    "Calling dependencies"
  );

  // call request
  const resultStream = createReadableStream(
    await loader(
      () => callCurrentRequest(token, dependenciesResult),
      `Calling request: ${globalConfig.request.name}`
    ).then((res) => res?.data)
  );
  resultStream.pipe(process.stdout);
}

main().catch((error) => console.error(error));
