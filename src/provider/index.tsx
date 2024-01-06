import { createContext, useContext } from "react";
import { useReducer, useMemo, useEffect } from "react";
import { ChainGrpcBankApi } from "@injectivelabs/sdk-ts";

import { tips } from "../util";
import { config } from "../config";
import { bigNumToNumber } from "../services/blockchain";
import { detectKeplrProvider, onWalletConnect } from "../services/walletService";
const walletStore = 'https://chrome.google.com/webstore/detail/dmkamcknogkgcdfhhbddcghachkejeap';

const INIT_STATE: InitStateObject = {
  loading: false,

  balance: 0,
  injectiveAddress: "",
  walletStatus: 0, // 0: no wallet detect, 1: not connected, 2: connected
}

// create context
const GlobalContext = createContext<any>({});
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => {
  // if (type === 'authToken') setStore(payload);
  return { ...state, [type]: payload };
}

// use contexts
function useGlobalContext() {
  return useContext(GlobalContext);
}

// // setAuthToken to localstorage Start
// const getStore = async (): Promise<string> => {
//   try {
//     const appKey = config.FRONTEND_URL + '-config';
//     const buf = window.localStorage.getItem(appKey + 'authToken');

//     if (typeof buf === 'string' && !!buf) {
//       return buf;
//     } else {
//       throw new Error("Type Error!");
//     }
//   } catch (err) {
//     return '';
//   }
// }

// const setStore = (authToken: string) => {
//   const appKey = config.FRONTEND_URL + '-config';
//   window.localStorage.setItem(appKey + 'authToken', authToken);
// }
// // setAuthToken to localstorage End

const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // blockchain actions start
  const walletStatusDetect = async () => {
    let tempStatus = 0;
    let provider = await detectKeplrProvider();
    if (provider) tempStatus = 1;


    if (state.walletStatus !== tempStatus) {
      dispatch({ type: "walletStatus", payload: tempStatus });
    }
  }
  // blockchain actions end

  // wallet section start
  useEffect(() => {
    (async () => {
      if (state.injectiveAddress) {
        const chainGrpcBankApi = new ChainGrpcBankApi(config.EndPoint.grpc);
        dispatch({ type: "walletStatus", payload: 2 });

        const data = { accountAddress: state.injectiveAddress, denom: 'inj' };
        const balance = await chainGrpcBankApi.fetchBalance(data);
        const amount = bigNumToNumber(balance.amount);
        dispatch({ type: "balance", payload: amount });
      } else {
        await walletStatusDetect();
        dispatch({ type: "balance", payload: 0 });
      }
    })()
  }, [state.injectiveAddress])

  const connectWallet = async () => {
    try {
      if (state.walletStatus === 0) {
        window.open(walletStore, "_blank");
      } else if (state.walletStatus === 2) {
        dispatch({ type: "injectiveAddress", payload: "" });
      } else {
        const [address] = await onWalletConnect();
        dispatch({ type: "injectiveAddress", payload: address });
      }
    } catch (err: any) {
      tips("warning", "Wallet  connectfailed!");
      dispatch({ type: "injectiveAddress", payload: "" });
    }
  }
  // wallet section end

  return (
    <GlobalContext.Provider
      value={useMemo(() => [
        state, { dispatch, connectWallet }
      ], [state])}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { useGlobalContext, ContextProvider };