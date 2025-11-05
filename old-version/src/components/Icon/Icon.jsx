import classNames from "classnames";

const Icon = ({ className, children }) => {
  return (
    <span className={classNames("material-icons", className)}>{children}</span>
  );
};

export default Icon;
