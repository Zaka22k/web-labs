import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";

const customDarkTheme = {
  ...webDarkTheme,
  colorNeutralBackground1: "#202020",
  colorNeutralBackground2: "#272727",
  colorNeutralBackground3: "#2d2d2d",
  colorNeutralBackground4: "#2d2d2d",
  colorNeutralBackground4Hover: "#2d2d2d",

  colorBrandBackground2: "#69734e",

  colorBrandForeground1: "#d8e7a7",
  colorCompoundBrandForeground1: "#b7c888",
  colorNeutralForeground2BrandHover: "#a7b77d",
  colorNeutralForeground2BrandPressed: "#b7c888",
  colorBrandForegroundLink: "#d8e7a7",
  colorBrandForegroundLinkHover: "#d8e7a7",
  colorBrandForegroundLinkPressed: "#b7c888",

  colorNeutralStrokeOnBrand: "#1d1d1d",
  colorNeutralStroke2: "#303030",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={customDarkTheme}>
    <App />
  </FluentProvider>
);
