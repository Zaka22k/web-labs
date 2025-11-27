import {
  Button,
  Spinner,
  Field,
  Input,
  InfoLabel,
} from "@fluentui/react-components";

export function SubmitButton(props) {
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
}

export function TextBox(props) {
  const {
    type = "text",
    label,
    required = false,
    onChange,
    value,
    hint,
    placeholder,
    info,
    max,
    min,
  } = props;

  return (
    <Field label={<InfoLabel info={info}>{label}</InfoLabel>} hint={hint}>
      <Input
        required={required}
        appearance="underline"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
      />
    </Field>
  );
}
