import Frame from "../Frame";
import Text from "../Text";
import Course from "../Course";
import Calendar from "../Calendar";
import styles from "./styles.jsx";
import { themeColors } from "../../config";
import TouchableOpacity from "../TouchableOpacity";
import { useHistory } from "react-router-dom";

const TutorCard = ({ tutor }) => {
  const history = useHistory();
  return (
    <TouchableOpacity
      style={styles.cardBox}
      onClick={() => {
        history.push("/profile/" + tutor.uid);
      }}
    >
      <Text style={styles.title}>{tutor.firstName + " " + tutor.lastName}</Text>
      <Text style={styles.major}>{tutor.major}</Text>
      <Frame
        style={{
          flexDirection: "row",
          jusitfyContent: "flex-start",
          flexWrap: "wrap",
          overflow: "auto",
          height: 70,
        }}
      >
        {tutor.classes.length === 0 ? (
          <Text style={styles.class}>no classes listed by this tutor</Text>
        ) : (
          tutor.classes.map((entry, index) => (
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
          ))
        )}
      </Frame>
      <Calendar
        data={tutor.schedule ? tutor.schedule : Array(42).fill(0)}
        width={200}
        height={100}
        style={{
          margin: 10,
          fontSize: 8,
          color: themeColors.white,
          backgroundColor: themeColors.darkgray,
        }}
      />
    </TouchableOpacity>
  );
};

const TutorList = ({ tutors }) => {
  const tutorCards = [];
  tutors.map((tutor) =>
    tutorCards.push(<TutorCard key={tutor.uid} tutor={tutor} />)
  );
  return <Frame style={styles.tutorList}>{tutorCards}</Frame>;
};

export default TutorList;
