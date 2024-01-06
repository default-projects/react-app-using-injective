import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

// import { textEllipsis } from "../util";
import { useGlobalContext } from "../provider";
import { Layout } from "../components/layout";

const Dashboard = () => {
  // const [state, { connectWallet }] = useGlobalContext();

  return (
    <Layout>
      {/* <DashboardWrapper>
        <Stack direction="row" justifyContent="end">
        <WalletConnectBtn onClick={connectWallet}>
        <Typography variant="h5">
        {state.injectiveAddress ? textEllipsis(state.injectiveAddress) : "Wallet Connect"}
        </Typography>
        </WalletConnectBtn>
      </Stack>
      </DashboardWrapper> */}
    </Layout>
  )
}

// const DashboardWrapper = styled(Stack)({
//   display: "flex",
//   flexDirection: "column",
//   padding: "20px 30px",
// })

// const WalletConnectBtn = styled(Stack)(({ theme }) => ({
//   backgroundColor: theme.palette.common.black,
//   padding: "10px 30px",
//   borderRadius: 30,
//   cursor: "pointer",
//   userSelect: "none",
// }))

export { Dashboard };