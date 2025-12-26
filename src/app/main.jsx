import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const LightTheme = {
  ...webLightTheme,
  colorNeutralStrokeSubtle: "hsl(0, 0%, 90%)",

  colorNeutralForeground1: "hsl(0, 0%, 10%)",
  colorNeutralForeground2: "hsl(0, 0%, 36%)",

  colorNeutralBackground1: "hsl(0, 0%, 99%)",
  colorNeutralBackground3: "hsl(0, 0%, 98%)",
  colorNeutralBackground4: "hsl(0, 0%, 95%)",
  colorNeutralBackground4Hover: "hsl(0, 0%, 92%)",

  colorNeutralStrokeDisabled: "#303030",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={LightTheme}>
    <App />
  </FluentProvider>
);
