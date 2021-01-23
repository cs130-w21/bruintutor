import styles from "./styles.jsx";

const ProfileDescription = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
        flex: 30,
        padding: 18,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        fontFamily: "roboto",
      }}
    >
      {children}
    </div>
  );
};

export default ProfileDescription;
