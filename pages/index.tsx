import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import Layout from "@/layout/index";

export default function Home() {
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return <Layout>lol</Layout>;
}
