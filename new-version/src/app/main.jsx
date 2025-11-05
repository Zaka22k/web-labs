import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const customLightTheme = {
  ...webLightTheme,
  colorNeutralBackground1: "#f3f3f3",
  colorNeutralBackground2: "#f9f9f9",
  colorNeutralBackground4: "#eaeaea",
  colorNeutralBackground4Hover: "#eaeaea",
  colorCompoundBrandForeground1: "#33441e",
  colorNeutralStrokeOnBrand: "#e5e5e5",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={customLightTheme}>
    <App />
  </FluentProvider>
);
