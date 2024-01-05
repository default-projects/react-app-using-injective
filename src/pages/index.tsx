import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

import { useGlobalContext } from "../provider";
import { textEllipsis } from "../util";

const Dashboard = () => {
  const [state, { connectWallet }] = useGlobalContext();

  return (
    <DashboardWrapper>
      <Stack direction="row" justifyContent="end">
        <WalletConnectBtn onClick={connectWallet}>
          <Typography variant="h5">
            {state.injectiveAddress ? textEllipsis(state.injectiveAddress) : "Wallet Connect"}
          </Typography>
        </WalletConnectBtn>
      </Stack>
    </DashboardWrapper>
  )
}

const DashboardWrapper = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  padding: "20px 30px",
})

const WalletConnectBtn = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  padding: "10px 30px",
  borderRadius: 30,
  cursor: "pointer",
  userSelect: "none",
}))

export { Dashboard };