# API_CLIENT

## Prepare

- Fetch dependencies

`yarn`

- Configure servers' env:

`cp sample.env .env.local`

`cp sample.env .env.recette`

- Configure scenarios:

`cp requests.sample.js config/requests.js`

## Usage

Request local server: `yarn st_l <scenarioName> --<scenarioArg> <scenarioVal>`

Request dist server: `yarn st_d <scenarioName> --<scenarioArg> <scenarioVal>`
