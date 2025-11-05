import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Slide } from "@fluentui/react-motion-components-preview";

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

  const iframeRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [src, setSrc] = useState(`/lab${labId}/task${taskId}/index.html`);

  useEffect(() => {
    const newSrc = `/lab${labId}/task${taskId}/index.html`;
    if (newSrc === src) return;

    setVisible(false);
    const timer = setTimeout(() => {
      setSrc(newSrc);
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [labId, taskId]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;

      doc.body.style.padding = "36px";

      doc.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href) return;

          if (/^https?:\/\//.test(href)) {
            e.preventDefault();
            window.open(href, "_blank");
          } else if (href === "/" || href === "/index.html") {
            e.preventDefault();
          }
        });
      });
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [src]);

  return (
    <div className={styles.container}>
      <Slide
        visible={visible}
        direction="horizontal"
        enterFrom="end"
        exitTo="start"
      >
        <iframe
          ref={iframeRef}
          key={src}
          src={src}
          className={styles.iframe}
          title={`lab${labId}-task${taskId}`}
        />
      </Slide>
    </div>
  );
}
