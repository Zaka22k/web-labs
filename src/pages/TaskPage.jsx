import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { makeStyles } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { PageTemplate } from "components";

const useStyles = makeStyles({
  container: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
});

export default function TaskPage() {
  const { labId, taskId } = useParams();
  const styles = useStyles();
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
          } else if (href === "/" || href === "/index.html") {
            e.preventDefault();
            navigate("/");
          }
        });
      });
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [labId, taskId]);

  return (
    <PageTemplate key={`${labId}-${taskId}`}>
      <div className={styles.container}>
        <iframe
          ref={iframeRef}
          src={`/lab${labId}/task${taskId}/`}
          className={styles.iframe}
          title={`lab${labId}-task${taskId}`}
        />
      </div>
    </PageTemplate>
  );
}
