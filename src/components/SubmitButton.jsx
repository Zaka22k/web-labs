import { Button, Spinner } from "@fluentui/react-components";

const SubmitButton = (props) => {
  const {
    appearance = "",
    children,
    loading = false,
    type = "submit",
    onClick,
    className,
  } = props;

  return (
    <Button
      type={type}
      appearance={appearance}
      disabled={loading}
      onClick={onClick}
      className={className}
    >
      {loading ? <Spinner size="tiny" /> : children}
    </Button>
  );
};

export default SubmitButton;
