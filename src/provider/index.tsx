import { useReducer, useMemo } from "react";
import { createContext, useContext } from "react";
// import { getAddresses } from './walletService';

const INIT_STATE: InitStateObject = {
  loading: false,
  injectiveAddress: "",
  ethereumAddress: "",
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

  const connectWallet = async () => {
    if (state.injectiveAddress) {
      dispatch({ type: "ethereumAddress", payload: "" });
      dispatch({ type: "injectiveAddress", payload: "" });
      return;
    }

    // const [address] = await getAddresses();
  }

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