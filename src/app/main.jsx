import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";

const customDarkTheme = {
  ...webDarkTheme,

  colorNeutralBackground2: "#2d2d2d",
  colorNeutralBackground3: "#272727",
  colorNeutralBackground4: "#202020",
  colorNeutralBackground4Hover: "#2d2d2d",

  colorNeutralForeground1: "#ffffff",
  colorNeutralForeground2: "#cccccc",
  colorBrandForegroundLink: "#99ebff",
  colorBrandForegroundLinkHover: "#4cc2ff",
  colorCompoundBrandForeground1: "#4cc2ff",
  colorBrandForeground1: "#99ebff",
  colorNeutralForeground2BrandHover: "#99ebff",
  colorNeutralForeground2BrandPressed: "#4cc2ff",

  colorBrandBackground2: "#296685",

  colorNeutralStroke1: "#1d1d1d",
  colorNeutralStroke2: "#303030",
  colorBrandStroke1: "#4cc2ff",
  colorBrandStroke2Contrast: "#25607e",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={customDarkTheme}>
    <App />
  </FluentProvider>
);
