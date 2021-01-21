import styles from "./styles.jsx";
const TextInput = ({ value, placeholder, onInput, extraStyle }) => {
  return (
    <input
      type="text"
      style={{ ...styles.input, ...extraStyle }}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
    />
  );
};

export default TextInput;
