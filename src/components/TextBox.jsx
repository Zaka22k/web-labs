import { Field, Input, InfoLabel } from "@fluentui/react-components";

const TextBox = (props) => {
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
    <Field
      label={<InfoLabel info={info}>{label}</InfoLabel>}
      required={required}
      hint={hint}
    >
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
      />
    </Field>
  );
};

export default TextBox;
