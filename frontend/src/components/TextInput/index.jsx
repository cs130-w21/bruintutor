import styles from "./styles.jsx";
const TextInput = ({
  value,
  type = "text",
  autoComplete,
  placeholder,
  onInput,
  style,
}) => {
  return (
    <input
      type={type}
      style={{ ...styles.input, ...style }}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onInput={onInput}
    />
  );
};

export default TextInput;
