import ProfileFrame from "../ProfileFrame";
import Course from "../Course";
import Frame from "../Frame";

const CourseSection = ({ classes }) => {
  const entries = [];
  classes.map((item, index) => {
    entries.push(<Course key={String(index)} courseName={item} />);
    return item;
  });
  return (
    <ProfileFrame style={{ width: 500, height: 200, margin: 10 }}>
      <Frame
        style={{
          width: "100%",
          overflow: "auto",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {entries}
      </Frame>
    </ProfileFrame>
  );
};
export default CourseSection;
