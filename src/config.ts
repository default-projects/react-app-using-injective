import { Network } from "@injectivelabs/networks";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

const env = import.meta.env
const IS_PRODUCTION: boolean = env.PROD;
const IS_DEVELOPMENT = !IS_PRODUCTION;
const ALCHEMY_GOERLI_KEY = env.VITE_ALCHEMY_GOERLI_KEY;

const NETWORK = (env.VITE_NETWORK || Network.Testnet) as Network;
const CHAIN_ID = (env.VITE_CHAIN_ID || ChainId.Testnet) as ChainId;
const ETHEREUM_CHAIN_ID = (env.VITE_ETHEREUM_CHAIN_ID || EthereumChainId.Goerli) as EthereumChainId;
const alchemyRpcEndpoint = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
const alchemyWsRpcEndpoint = `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
const IS_TESTNET: boolean = [Network.Testnet, Network.TestnetK8s,].includes(NETWORK);

const config = {
  DEBUG: true,
  IS_PRODUCTION: IS_PRODUCTION,
  IS_DEVELOPMENT: IS_DEVELOPMENT,

  BACKEND_URL: env.VITE_BACKEND,
  FRONTEND_URL: env.VITE_FRONTEND,

  NETWORK,
  CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  alchemyRpcEndpoint,
  alchemyWsRpcEndpoint,
  IS_TESTNET,
}

export { config };