import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TaskPreview.module.css";
import { useParams } from "react-router-dom";

const TaskPreview = () => {
  const { labId, taskId } = useParams();
  const iframeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;

      doc.body.style.paddingTop = "85px";

      doc.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href) return;

          if (/^https?:\/\//.test(href)) {
            e.preventDefault();
            window.open(href, "_blank");
          } else if (href === "/" || href === "/index.html") {
            e.preventDefault();
            navigate("/");
          }
        });
      });
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [navigate]);

  return (
    <iframe
      ref={iframeRef}
      src={`/lab${labId}/task${taskId}/`}
      className={styles.frame}
    />
  );
};

export default TaskPreview;
