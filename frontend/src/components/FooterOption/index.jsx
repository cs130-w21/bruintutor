import TouchableOpacity from "../TouchableOpacity";
import { themeColors } from "../../config.js";
const FooterOption = ({ optionText, optionEffect }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 0,
        padding: 20,
        fontSize: 20,
        margin: 0,
        fontWeight: "bold",
        borderWidth: 0,
        color: themeColors.darkblue,
        backgroundColor: themeColors.lightgray,
      }}
      onClick={optionEffect}
    >
      {optionText}
    </TouchableOpacity>
  );
};
export default FooterOption;
