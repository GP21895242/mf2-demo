import { Switch, useColorScheme } from "@mui/material";
import React from "react";

type Props = {};

export default function ModeSwitch({}: Props) {
  const { mode, setMode } = useColorScheme();
  return (
    <div>
      <span>
        <Switch
          onChange={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        />
      </span>
      Dark Mode
    </div>
  );
}
