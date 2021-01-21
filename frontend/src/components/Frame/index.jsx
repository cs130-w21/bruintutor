import styles from "./styles";
const Frame = ({ children, extraStyle }) => {
  return <div style={{ ...styles.frame, ...extraStyle }}>{children}</div>;
};
export default Frame;
