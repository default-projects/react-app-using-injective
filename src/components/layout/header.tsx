import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

import { GlobalSpacing } from "./common";
import { logoImg } from "../../assets/image";
import { useGlobalContext } from "../../provider";
import { textEllipsis } from "../../util";

interface HeaderProps {
  sticky: boolean
}

const Header = ({ sticky }: HeaderProps) => {
  const [state, { connectWallet }] = useGlobalContext();

  return (
    <HeaderWrapper sticky={sticky}>
      <HeaderContainer>
        <LogoWrapper to='/'>
          <img alt="" src={logoImg} />
          <Typography variant="h3">INJECTIVE</Typography>
        </LogoWrapper>

        <ConnectButton onClick={connectWallet}>
          <Typography variant="h6">
            {state.injectiveAddress ? textEllipsis(state.injectiveAddress) : "Wallet Connect"}
          </Typography>
        </ConnectButton>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled(Stack)<{ sticky: boolean }>(({ sticky }) => ({
  zIndex: 10,
  top: 0, left: 0,
  width: "100vw",
  position: 'fixed',
  backdropFilter: sticky ? 'blur(20px)' : 'none',
  transition: sticky ? 'all 0.6s ease-out 0s' : 'all 0.6s ease-in 0s',
  boxShadow: sticky ? '#ffffff1a 0px 10px 15px -3px, #ffffff1a 0px 4px 6px -4px' : 'none',
}))

const HeaderContainer = styled(GlobalSpacing)(({ theme }) => ({
  height: 90,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("lg")]: {
    height: 80,
  },

  [theme.breakpoints.down("md")]: {
    height: 70,
  },
}))

const LogoWrapper = styled(Link)({
  gap: 10,
  height: '100%',
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  img: {
    height: '50%',
  },

  h4: {
    fontWeight: 800
  }
})

const ConnectButton = styled(Stack)(({ theme }) => ({
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

export { Header };