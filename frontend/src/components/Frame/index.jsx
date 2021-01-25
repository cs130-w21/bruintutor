import styles from "./styles";
const Frame = ({ children, style }) => {
  return <div style={{ ...styles.frame, ...style }}>{children}</div>;
};
export default Frame;
