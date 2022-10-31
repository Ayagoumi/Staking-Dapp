import { merge } from "lodash";
import { Theme } from "@mui/material/styles";
import Toolbar from "./Toolbar";

export default function ComponentsOverrides(theme: Theme) {
  return merge(Toolbar(theme));
}
