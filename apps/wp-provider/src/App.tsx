import { Box } from "common";
// import { Box } from "@mui/material";
import Button from "./button";
import ModeSwitch from "./ModeSwitch";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";

const App = () => {
  return (
    <CssVarProvider>
      <CssBaseline />
      <Box>
        <Button />
        <ModeSwitch />
      </Box>
    </CssVarProvider>
  );
};

export default App;
