This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server
- The Server can be accesed at ([localhost:5000/getAbi/:address](http://localhost:5000/getAbi/:address))
- To get abi send GET request to ([localhost:5000/getAbi/:address](http://localhost:5000/getAbi/:address))


## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it.
- `abis/` - This folder contains the abis stored in JSON file.
- `.env` - This file contains the etherscan url as well as api.


