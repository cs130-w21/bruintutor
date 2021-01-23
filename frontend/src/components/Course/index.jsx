import Text from "../Text";
import { themeColors } from "../../config";

const Course = ({ courseName }) => {
  return (
    <Text
      style={{
        backgroundColor: themeColors.lightgray,
        color: themeColors.black,
        padding: 10,
        margin: 10,
        fontSize: 15,
        fontWeight: "bold",
      }}
    >
      {courseName}
    </Text>
  );
};

export default Course;
