import TouchableOpacity from "../TouchableOpacity";
import { themeColors } from "../../config";

const Course = ({ courseName, onClick, style }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: themeColors.lightgray,
        color: themeColors.black,
        padding: 10,
        margin: 10,
        fontSize: 15,
        fontWeight: "bold",
        ...style,
      }}
      onClick={onClick}
    >
      {courseName}
    </TouchableOpacity>
  );
};

export default Course;
