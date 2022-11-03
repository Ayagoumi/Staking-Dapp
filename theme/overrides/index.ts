import { merge } from "lodash";
import { Theme } from "@mui/material/styles";
import Toolbar from "./Toolbar";
import Card from "./Card";
import CardActionArea from "./CardActionArea";
import Paper from "./Paper";
import OutlinedInput from "./OutlinedInput";

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Toolbar(theme),
    CardActionArea(theme),
    Paper(theme),
    Card(theme),
    OutlinedInput()
  );
}
