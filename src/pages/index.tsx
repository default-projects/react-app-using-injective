import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Dashboard = () => {
  const onConnect = () => {
    console.log("metamask connect")
  }

  return (
    <DashboardWrapper>
      <Stack direction="row" justifyContent="end">
        <WalletConnectBtn onClick={onConnect}>
          <Typography variant="h5">Connect</Typography>
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