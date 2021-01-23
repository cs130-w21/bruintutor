import TouchableOpacity from "../TouchableOpacity";
import styles from "./styles.jsx";

const AppButton = ({ children, style, onClick }) => {
  return (
    <TouchableOpacity onClick={onClick} style={{ ...styles.button, ...style }}>
      {children}
    </TouchableOpacity>
  );
};

export default AppButton;
