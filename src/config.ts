import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

const env = import.meta.env
const IS_PRODUCTION: boolean = env.PROD;
const IS_DEVELOPMENT = !IS_PRODUCTION;

const NETWORK = (env.VITE_NETWORK || Network.TestnetK8s) as Network;
const CHAIN_ID = (env.VITE_CHAIN_ID || ChainId.Testnet) as ChainId;
const ETHEREUM_CHAIN_ID = (env.VITE_ETHEREUM_CHAIN_ID || EthereumChainId.Goerli) as EthereumChainId;
const IS_TESTNET: boolean = [Network.Testnet, Network.TestnetK8s,].includes(NETWORK);
const EndPoint = getNetworkEndpoints(NETWORK);

const config = {
  DEBUG: true,
  IS_PRODUCTION: IS_PRODUCTION,
  IS_DEVELOPMENT: IS_DEVELOPMENT,

  BACKEND_URL: env.VITE_BACKEND,
  FRONTEND_URL: env.VITE_FRONTEND,

  NETWORK,
  CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  EndPoint,
  IS_TESTNET,
}

export { config };