import { motion } from "framer-motion";

const PageTransition = ({ children, className, transitionKey }) => {
  return (
    <motion.div
      key={transitionKey}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: [0.55, 0, 0.55, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
