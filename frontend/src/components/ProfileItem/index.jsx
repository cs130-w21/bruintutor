import styles from "./styles.jsx";

const ProfileItem = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
        flex: 70,
        padding: 10,
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

export default ProfileItem;
