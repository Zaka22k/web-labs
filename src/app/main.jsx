import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";

const darkTheme = {
  ...webDarkTheme,
  colorNeutralStrokeSubtle: "#1d1d1d",

  colorNeutralForeground1: "#ffffff",
  colorNeutralForeground2: "#cccccc",

  colorNeutralBackground1: "#373737",
  colorNeutralBackground3: "#272727",
  colorNeutralBackground4: "#202020",
  colorNeutralBackground4Hover: "#2d2d2d",

  colorBrandBackground: "hsl(20, 39%, 74%)",
  colorBrandBackgroundHover: "hsl(25, 51%, 84%)",
  colorBrandBackgroundPressed: "hsl(19, 21%, 62%)",
  colorBrandBackgroundSelected: "hsl(20, 28%, 68%)",

  colorCompoundBrandBackground: "hsl(20, 28%, 68%)",
  colorCompoundBrandBackgroundHover: "hsl(25, 51%, 84%)",
  colorCompoundBrandBackgroundPressed: "hsl(19, 21%, 62%)",

  colorBrandBackgroundStatic: "hsl(20, 39%, 74%)",
  colorBrandBackground2: "hsl(19, 19%,52%)",
  colorBrandBackground2Hover: "hsl(20, 28%, 68%)",
  colorBrandBackground2Pressed: "hsl(19, 20%, 50%)",

  colorBrandBackground3Static: "hsl(20, 28%, 68%)",
  colorBrandBackground4Static: "hsl(19, 21%, 62%)",

  colorBrandBackgroundInverted: "hsl(19, 25%, 25%)",
  colorBrandBackgroundInvertedHover: "hsl(19, 25%, 30%)",
  colorBrandBackgroundInvertedPressed: "hsl(19, 25%, 20%)",
  colorBrandBackgroundInvertedSelected: "hsl(20, 28%, 68%)",

  colorBrandForeground1: "hsl(20, 39%, 74%)",
  colorBrandForeground1Hover: "hsl(25, 51%, 84%)",
  colorBrandForeground1Pressed: "hsl(19, 21%, 62%)",
  colorCompoundBrandForeground1: "hsl(20, 39%, 74%)",

  colorBrandForeground2: "hsl(20, 28%, 68%)",
  colorBrandForeground2Hover: "hsl(25, 51%, 84%)",
  colorBrandForeground2Pressed: "hsl(19, 21%, 62%)",

  colorBrandForegroundLink: "hsl(20, 39%, 74%)",
  colorBrandForegroundLinkHover: "hsl(26, 55%, 85%)",
  colorBrandForegroundLinkPressed: "hsl(19, 21%, 62%)",
  colorBrandForegroundLinkSelected: "hsl(20, 28%, 68%)",

  colorBrandForegroundInverted: "hsl(60, 30%, 96%)",
  colorBrandForegroundInvertedHover: "hsl(60, 20%, 99%)",
  colorBrandForegroundInvertedPressed: "hsl(60, 40%, 92%)",

  colorBrandForegroundOnLight: "hsl(19, 30%, 45%)",
  colorBrandForegroundOnLightHover: "hsl(19, 35%, 38%)",
  colorBrandForegroundOnLightPressed: "hsl(19, 35%, 32%)",
  colorBrandForegroundOnLightSelected: "hsl(20, 28%, 68%)",

  colorNeutralForeground2BrandHover: "hsl(25, 51%, 84%)",
  colorNeutralForeground2BrandPressed: "hsl(19, 21%, 62%)",
  colorNeutralForeground2BrandSelected: "hsl(20, 28%, 68%)",

  colorNeutralForeground3BrandHover: "hsl(25, 51%, 84%)",
  colorNeutralForeground3BrandPressed: "hsl(19, 21%, 62%)",
  colorNeutralForeground3BrandSelected: "hsl(20, 28%, 68%)",

  colorNeutralStrokeAccessibleSelected: "hsl(20, 39%, 74%)",

  colorBrandStroke1: "hsl(20, 39%, 74%)",
  colorBrandStroke2: "hsl(19, 21%, 62%)",
  colorBrandStroke2Hover: "hsl(20, 28%, 68%)",
  colorBrandStroke2Pressed: "hsl(19, 20%, 50%)",
  colorBrandStroke2Contrast: "hsl(25, 51%, 84%)",

  colorCompoundBrandStroke: "hsl(20, 28%, 68%)",
  colorCompoundBrandStrokeHover: "hsl(25, 51%, 84%)",
  colorCompoundBrandStrokePressed: "hsl(19, 21%, 62%)",

  colorNeutralStrokeDisabled: "#303030",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={darkTheme}>
    <App />
  </FluentProvider>
);
