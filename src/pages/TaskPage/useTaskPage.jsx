import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

      doc.body.style.padding = "24px";

      doc.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href) return;

          if (/^https?:\/\//.test(href)) {
            e.preventDefault();
            window.open(href, "_blank");
          } else if (
            href === "/" ||
            href === "/index.html" ||
            href === import.meta.env.BASE_URL
          ) {
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
