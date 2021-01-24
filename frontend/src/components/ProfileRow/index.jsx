import styles from "./styles.jsx";

const ProfileRow = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "roboto",
      }}
    >
      {children}
    </div>
  );
};

export default ProfileRow;
