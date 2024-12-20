// import Switch from "@mui/material/Switch";
// import { useColorScheme } from "@mui/material/styles";
import { Switch, useColorScheme } from "@mui/material";

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
