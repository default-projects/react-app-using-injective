import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Header } from "./header";

const Layout = ({ children }: any) => {
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  const onScroll = () => {
    setSticky(document.documentElement.scrollTop > 50);
  }

  return (
    <LayoutWrapper>
      <Header sticky={sticky} />
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  overflowX: "hidden",
  backgroundColor: theme.palette.common.mainBg,
  paddingTop: 90,

  [theme.breakpoints.down("lg")]: {
    paddingTop: 80,
  },

  [theme.breakpoints.down("md")]: {
    paddingTop: 70,
  },
}))

export { Layout };