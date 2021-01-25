import styles from "./styles.jsx";
const TouchableOpacity = ({ children, onClick, style }) => {
  return (
    <div
      onMouseOver={(e) => (e.target.style.opacity = 0.5)}
      onMouseOut={(e) => (e.target.style.opacity = 1)}
      style={{ ...styles.button, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TouchableOpacity;