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

  colorNeutralForeground2BrandHover: "#c5d79a",
  colorNeutralForeground2BrandPressed: "#8f9f63",
  colorNeutralForeground2BrandSelected: "#98a672",

  colorNeutralForeground3BrandHover: "#c5d79a",
  colorNeutralForeground3BrandPressed: "#8f9f63",
  colorNeutralForeground3BrandSelected: "#98a672",

  colorBrandForegroundLink: "#b7c888",
  colorBrandForegroundLinkHover: "#cfe2a3",
  colorBrandForegroundLinkPressed: "#8a9961",
  colorBrandForegroundLinkSelected: "#98a672",

  colorBrandForeground1: "#b7c888",
  colorBrandForeground1Hover: "#cfe2a3",
  colorBrandForeground1Pressed: "#8a9961",
  colorCompoundBrandForeground1: "#b7c888",

  colorBrandForeground2: "#a7b77d",
  colorBrandForeground2Hover: "#c5d79a",
  colorBrandForeground2Pressed: "#7c8b58",

  colorBrandForegroundInverted: "#3c4a23",
  colorBrandForegroundInvertedHover: "#506233",
  colorBrandForegroundInvertedPressed: "#2a3518",

  colorBrandForegroundOnLight: "#8fa05d",
  colorBrandForegroundOnLightHover: "#6f8043",
  colorBrandForegroundOnLightPressed: "#55642f",
  colorBrandForegroundOnLightSelected: "#98a672",

  colorBrandBackground: "#b7c888",
  colorBrandBackgroundHover: "#cfe2a3",
  colorBrandBackgroundPressed: "#8f9f63",
  colorBrandBackgroundSelected: "#98a672",

  colorCompoundBrandBackground: "#a7b77d",
  colorCompoundBrandBackgroundHover: "#c5d79a",
  colorCompoundBrandBackgroundPressed: "#8f9f63",

  colorBrandBackgroundStatic: "#b7c888",

  colorBrandBackground2: "#3c4425",
  colorBrandBackground2Hover: "#4a5630",
  colorBrandBackground2Pressed: "#2c3318",

  colorBrandBackground3Static: "#98a672",
  colorBrandBackground4Static: "#7c8b58",

  colorBrandBackgroundInverted: "#2f331e",
  colorBrandBackgroundInvertedHover: "#3c4425",
  colorBrandBackgroundInvertedPressed: "#1f2412",
  colorBrandBackgroundInvertedSelected: "#4a5630",

  colorNeutralStrokeAccessibleSelected: "#b7c888",

  colorBrandStroke1: "#b7c888",
  colorBrandStroke2: "#4a5630",
  colorBrandStroke2Hover: "#6a7543",
  colorBrandStroke2Pressed: "#2c3318",
  colorBrandStroke2Contrast: "#cfe2a3",

  colorCompoundBrandStroke: "#a7b77d",
  colorCompoundBrandStrokeHover: "#c5d79a",
  colorCompoundBrandStrokePressed: "#8f9f63",

  colorNeutralStrokeDisabled: "#303030",
};

createRoot(document.getElementById("root")).render(
  <FluentProvider theme={darkTheme}>
    <App />
  </FluentProvider>
);
