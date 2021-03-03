import Frame from "../Frame";
import Text from "../Text";
import Course from "../Course";
import Calendar from "../Calendar";
import styles from "./styles.jsx";
import { themeColors } from "../../config";

const TutorCard = ({ tutor }) => {
  console.log(tutor);
  return (
    <Frame style={styles.cardBox}>
      <Text style={styles.title}>{tutor.firstName + " " + tutor.lastName}</Text>
      <Text style={styles.rating}>{Array(tutor.rating).fill("★")}</Text>

      <Frame
        style={{
          flexDirection: "row",
          jusitfyContent: "flex-start",
          flexWrap: "wrap",
          overflow: "auto",
          maxHeight: 70,
        }}
      >
        {tutor.classes.map((entry, index) => (
          <Course
            key={index}
            courseName={entry}
            style={{
              fontSize: 11,
              margin: 5,
              padding: 5,
              backgroundColor: themeColors.darkgray,
            }}
            onClick={() => {}}
          />
        ))}
      </Frame>
      <Calendar
        data={Array(42).fill(1)}
        width={200}
        height={100}
        style={{
          margin: 10,
          fontSize: 8,
          color: themeColors.white,
          backgroundColor: themeColors.darkgray,
        }}
      />
    </Frame>
  );
};

const TutorList = ({ tutors }) => {
  const tutorCards = [];
  tutors.map((tutor) => tutorCards.push(<TutorCard tutor={tutor} />));
  return <Frame style={styles.tutorList}>{tutorCards}</Frame>;
};

export default TutorList;
