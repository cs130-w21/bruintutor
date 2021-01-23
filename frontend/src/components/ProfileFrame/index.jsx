import { themeColors } from "../../config";
import Frame from "../Frame";

const ProfileFrame = ({ children, style }) => {
  return (
    <Frame
      style={{
        borderRadius: 20,
        backgroundColor: themeColors.darkgray,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </Frame>
  );
};

export default ProfileFrame;
