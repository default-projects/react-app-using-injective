import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { ChainGrpcWasmApi, MsgExecuteContractCompat, fromBase64, toBase64 } from "@injectivelabs/sdk-ts";

import { config } from "../config";
import { logoImg } from "../assets/image";
import { Layout } from "../components/layout";
import { useGlobalContext } from "../provider";
import { msgBroadcastClient } from "../services/walletService";
import { tips } from "../util";
const contractAddress = "inj1sctz0m3cq92ajj32w87edq62yjqx0l04lgnypf";

const Dashboard = () => {
  const [state, { dispatch }] = useGlobalContext();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    getCounter();
  }, [state.injectiveAddress])

  const getCounter = async () => {
    if (!state.injectiveAddress) {
      if (counter !== 0) setCounter(0);
    } else {
      const chainGrpcWasmApi = new ChainGrpcWasmApi(config.EndPoint.grpc);
      const response = await chainGrpcWasmApi.fetchSmartContractState(
        contractAddress, toBase64({ counter: {} })
      ) as { data: any }

      const result = fromBase64(response.data) as { counter: number }
      if (result.counter !== counter) setCounter(result.counter);
    }
  }

  const updateCounter = async () => {
    try {
      if (!state.injectiveAddress) return;
      dispatch({ type: "loading", payload: true });

      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: contractAddress,
        sender: state.injectiveAddress,
        msg: { update: {} },
      })

      await msgBroadcastClient.broadcast({
        msgs: msg, injectiveAddress: state.injectiveAddress
      })

      tips("success", "Update counter successed!");
      dispatch({ type: "loading", payload: false });
      getCounter();
    } catch (err: any) {
      tips("error", "Update counter failed!");
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <Layout>
      <DashboardWrapper>
        <img alt="" src={logoImg} />

        {state.walletStatus === 2 && (
          <Stack gap={1} direction="row" alignItems="center">
            <Typography variant="h6">Count : </Typography>
            <Typography variant="h6">{counter}</Typography>

            <UpdateButton marginLeft={5} onClick={updateCounter}>
              <Typography variant="h6">Update</Typography>
            </UpdateButton>
          </Stack>
        )}
      </DashboardWrapper>
    </Layout>
  )
}

const DashboardWrapper = styled(Stack)(({ theme }) => ({
  gap: 50,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 'calc(100vh - 90px)',

  img: {
    maxWidth: 300,
    width: "100%",
  },

  [theme.breakpoints.down("lg")]: {
    height: 'calc(100vh - 80px)',
    gap: 30,
  },

  [theme.breakpoints.down("md")]: {
    height: 'calc(100vh - 70px)',
    gap: 20,
  },
}))

const UpdateButton = styled(Stack)(({ theme }) => ({
  padding: '12px 25px',
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderColor: theme.palette.common.buttonBg,
  transform: 'translate(0, 0) rotate(0) skewX(-30deg) skewY(0) scaleX(1) scaleY(1)',

  cursor: "pointer",
  userSelect: "none",
  textAlign: "center",
  transitionDuration: "300ms",

  h6: {
    transform: 'translate(0, 0) rotate(0) skewX(30deg) skewY(0) scaleX(1) scaleY(1)',
  },

  '&:hover': {
    backgroundColor: theme.palette.common.buttonBg,

    h6: {
      color: theme.palette.common.black,
    },
  },

  [theme.breakpoints.down('lg')]: {
    padding: '10px 20px',
  },

  [theme.breakpoints.down('md')]: {
    padding: '8px 15px',
  },
}))

export { Dashboard };