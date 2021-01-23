import TextInput from "../TextInput";
import styles from "./styles.jsx";
const AppTextInput = ({
  value,
  style,
  type,
  autoComplete,
  placeholder,
  onInput,
}) => {
  return (
    <TextInput
      type={type}
      value={value}
      style={{ ...styles.input, ...style }}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onInput={onInput}
    />
  );
};

export default AppTextInput;
