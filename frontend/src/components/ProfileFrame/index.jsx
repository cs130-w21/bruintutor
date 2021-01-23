import { themeColors } from "../../config";
import Frame from "../Frame";

const ProfileFrame = ({ children, style }) => {
  return (
    <Frame
      style={{
        borderRadius: 20,
        backgroundColor: themeColors.darkgray,
        padding: 20,
        boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      {children}
    </Frame>
  );
};

export default ProfileFrame;
