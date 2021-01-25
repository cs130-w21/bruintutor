import { themeColors } from "../../config";

const ClassBubble = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
        padding: "1em",
        backgroundColor: themeColors.darkgray,
        display: "flex",
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

export default ClassBubble;
