import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const THEME_TOKENS = {
  "--TextFillColorPrimaryBrush": "hsl(0, 0%, 100%)",
  "--TextFillColorSecondaryBrush": "hsl(0, 0%, 80%)",
  "--TextFillColorTertiaryBrush": "hsl(0, 0%, 59%)",
  "--TextOnAccentFillColorPrimaryBrush": "hsl(0, 0%, 0%)",

  "--AccentTextFillColorPrimaryBrush": "hsl(26, 55%, 85%)",
  "--AccentTextFillColorSecondaryBrush": "hsl(26, 55%, 85%)",
  "--AccentTextFillColorTertiaryBrush": "hsl(20, 39%, 74%)",

  "--ControlFillColorDefaultBrush": "hsl(0, 0%, 18%)",
  "--ControlFillColorSecondaryBrush": "hsl(0, 0%, 20%)",
  "--ControlFillColorTertiaryBrush": "hsl(0, 0%, 15%)",

  "--AccentFillColorDefaultBrush": "hsl(20, 39%, 74%)",
  "--AccentFillColorSecondaryBrush": "hsl(20, 28%, 68%)",
  "--AccentFillColorTertiaryBrush": "hsl(19, 21%, 62%)",

  "--CardStrokeColorDefaultBrush": "hsl(0, 0%, 11%)",
  "--ControlStrokeColorDefaultBrush": "hsl(0, 0%, 19%)",
  "--ControlStrongStrokeColorDefaultBrush": "hsl(0, 0%, 60%)",

  "--SystemFillColorSuccessBrush": "hsl(113, 51%, 58%)",
  "--SystemFillColorSuccessBackgroundBrush": "hsl(67, 39%, 17%)",

  "--SystemFillColorCautionBrush": "hsl(54, 100%, 49%)",
  "--SystemFillColorCautionBackgroundBrush": "hsl(40, 46%, 18%)",

  "--SystemFillColorCriticalBrush": "hsl(354, 100%, 80%)",
  "--SystemFillColorCriticalBackgroundBrush": "hsl(2, 28%, 21%)",

  "--CardBackgroundFillColorDefaultBrush": "hsl(0, 0%, 17%)",
  "--LayerFillColorDefaultBrush": "hsl(0, 0%, 15%)",
};

const injectThemeTokens = (doc) => {
  if (!doc) return;
  Object.entries(THEME_TOKENS).forEach(([property, value]) => {
    doc.documentElement.style.setProperty(property, value);
  });
};

export default function useTaskPage() {
  const { labId, taskId } = useParams();
  const navigate = useNavigate();

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;

      injectThemeTokens(doc);

      doc.body.style.padding = "24px";

      doc.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href) return;

          if (/^https?:\/\//.test(href)) {
            e.preventDefault();
            window.open(href, "_blank");
          } else if (href === "/" || href === "/index.html") {
            e.preventDefault();
            navigate("/dashboard");
          }
        });
      });
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [labId, taskId]);

  return {
    labId,
    taskId,
    iframeRef,
  };
}
