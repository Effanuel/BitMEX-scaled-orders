<p align="center">
  <img src='assets/presentation_scaled_v5.gif'>
</p>

## Table of Contents

- [Current Features](#current-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Distributions](#distributions)
- [Roadmap](#roadmap)
- [License](#license)
- [Useful material](#useful-material)

<p align="center">
  <img src="assets/interface_range_tool_v6.png">
</p>

# BitMEX scaled orders tool

This project is a trading tool based on **BitMEX API** to help you place orders in a range (It can also be used to overcome the overload feature on the website (although sometimes API's also get suspended due to high load)).
_(In the next major update, I'll try to include custom order placement with a stepping stop-loss)_

### Current Features

- **Scaled orders:**
  - Place up to 30 orders in a range at once _(small order sizes will cause a **spam warning**)_;
  - **Uniform, Normal, Positive or Negative** order placing distributions; (see [Distributions](#distributions) section).
- **Shows current price:**
  - Based on the latest ask price;
  - Fetched via **Websocket**;
  - BTC and ETH _(currently)_.
- **Details table:**
  - Average entry of scaled orders;
  - Risk in BTC;
  - Risk of account balance.

### Built With

The Backend was built using **Node + Express** and the Frontend, **React + Redux**. Styled components were taken from **React Bootstrap**. _(CCXT is no longer a dependency since v1.2)_

- [Node](https://nodejs.org/en/) + [Express](https://expressjs.com/)
- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
  <!-- GETTING STARTED -->

## Getting Started

- Create a [BitMEX](https://www.bitmex.com) account;

  _(If you are **new** to BitMEX, consider using my [affiliate link](https://www.bitmex.com/register/o8ILy1) to get **10% off** the fees for 6 months.)_

* Get API keys:
  - Account > API keys > Create API key;
    - **Key Permissions** : Order;
    - **Withdraw**: Unchecked;

### Prerequisites

- [Nodejs](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads) _(for cloning the repository)_

### Installation

1. Clone the repo:

```sh
git clone https://github.com/Effanuel/Bitmex-scaled-orders.git
cd Bitmex-scaled-orders-master/api
```

2. Install NPM packages for client and server:

```sh
npm run init:packages
```

3. Enter your API keys in `.env` _(no quotes are needed)_:

```
API_KEY = <API_KEY>
API_SECRET = <API_SECRET_KEY>
TESTNET = false
```

_**Disclaimer:** You need to set API keys **before building the application**. If you make a typo and only notice after a build, do_</br>
`npm run clean` and `npm build`

_**Disclaimer:** If you set TESTNET to true, you need to create a [Testnet](https://testnet.bitmex.com/) account and set the API keys appropriately. Your main BitMEX account API won't work with TESTNET option set to true._

4. Build the application:

```sh
npm run build
```

  <!-- USAGE EXAMPLES -->

#### TLDR setup:

```sh
git clone https://github.com/Effanuel/Bitmex-scaled-orders.git
cd Bitmex-scaled-orders/api
```

- Put API keys in `.env`

```sh
npm run init:packages
npm run build
npm run prod
```

## Usage

##### After building you just need to run the application:

```sh
cd Bitmex-scaled-orders/api
npm run prod
```

**Run tests:** _(not many at the moment)_

```sh
cd Bitmex-scaled-orders/client
npm test
```

## Distributions

These are the available distributions to choose from:

  <p align="center">
  <img src="assets/distributions.png">
  </p>

This is the formula used to calculate distributions:

![formula](https://wikimedia.org/api/rest_v1/media/math/render/svg/4abaca87a10ecfa77b5a205056523706fe6c9c3f)

_(The chart representations are symbolic)_ </br>
_(You can view the code in `client/src/util/index.ts` file)_

## Roadmap

* **Chasing price** for limit orders;
* **Faster price update**;
* Stepping stop-loss;
* Custom order/profit target placement;
* Market Orders;
* Bitfinex/Binance API;
* Easier API setup;
* Multiple accounts for every platform;
* Saving cache;
* Settings for multiple ticker subscriptions;

  <!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

  <!-- USEFUL METERIAL -->

## Useful Material

- [BitMEX Survival Guide](https://www.crypto-simplified.com/wp-content/uploads/2018/09/BitMEX-Survival-Guide-v1.5.pdf)
- [Crypto news](https://cointelegraph.com/)
- [BitMEX position calculator](https://blockchainwhispers.com/bitmex-position-calculator/)
- [Crypto sentiment/statistics tool](https://thetie.io/)
