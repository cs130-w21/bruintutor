import styles from "./styles";
const ProfileFrame = ({ children, extraStyle }) => {
  return <div style={{ ...styles.frame, ...extraStyle }}>{children}</div>;
};
export default ProfileFrame;
