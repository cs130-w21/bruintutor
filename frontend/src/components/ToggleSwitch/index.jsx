import Frame from "../Frame";
import Switch from "react-switch";
import Text from "../Text";
import { themeColors } from "../../config";

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  onColor,
  offColor,
  height = 30,
  width = 56,
}) => {
  return (
    <Frame style={{ flexDirection: "row", margin: 10 }}>
      <Text
        style={{
          marginRight: 10,
          fontWeight: "bold",
          fontSize: 15,
          color: themeColors.black,
        }}
      >
        {label}
      </Text>
      <Switch
        checked={checked}
        uncheckedIcon={false}
        onChange={onChange}
        onColor={onColor}
        offColor={offColor}
        height={height}
        width={width}
        activeBoxShadow={"2px 2px 5px black"}
      />
    </Frame>
  );
};
export default ToggleSwitch;
