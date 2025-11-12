import { SlideRelaxed } from "@fluentui/react-motion-components-preview";
import { useState, useEffect } from "react";

export default function PageTemplate({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return <SlideRelaxed visible={visible}>{children}</SlideRelaxed>;
}
