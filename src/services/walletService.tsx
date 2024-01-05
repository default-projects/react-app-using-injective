import { WalletStrategy } from "@injectivelabs/wallet-ts";
import { Web3Exception } from "@injectivelabs/exceptions";
import { config } from "../config";

const walletStrategy = new WalletStrategy({
  chainId: config.CHAIN_ID,
  ethereumOptions: {
    ethereumChainId: config.ETHEREUM_CHAIN_ID,
    rpcUrl: config.alchemyRpcEndpoint,
  }
})

const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.getAddresses();
  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    )
  }

  return addresses;
}

export { getAddresses };