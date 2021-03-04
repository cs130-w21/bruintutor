import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SeachBar";
import TutorList from "../../components/TutorList";
import NotificationBar from "../../components/NotificationBar";
import TouchableOpacity from "../../components/TouchableOpacity";
import { icons } from "../../config";
const SearchPage = ({
  uid,
  userStore,
  matchedTutors,
  notificationOn,
  notifications,
  setNotificationOn,
}) => {
  const history = useHistory();
  const tutors = [];
  matchedTutors.map((tutorId) => tutors.push(userStore[tutorId]));
  return (
    <PageFrame
      onTitleClick={() => history.push("/profile/" + uid)}
      headerRight={
        <TouchableOpacity
          style={{ margin: 10 }}
          onClick={() => {
            setNotificationOn(!notificationOn);
          }}
        >
          {notificationOn ? icons.notificationOn : icons.notificationOff}
        </TouchableOpacity>
      }
    >
      {notificationOn && <NotificationBar notifications={notifications} />}
      <Frame
        style={{
          flexDirection: "row",
          flex: 1,
          alignSelf: "stretch",
          overflow: "auto",
        }}
      >
        <Frame
          style={{
            flexDirection: "column",
            alignSelf: "stretch",
            overflow: "auto",
          }}
        >
          <SearchBar />
        </Frame>
        <Frame
          style={{
            flexDirection: "column",
            alignSelf: "stretch",
            flex: 1,
            overflow: "auto",
            justifyContent: "flex-start",
          }}
        >
          <TutorList tutors={tutors} />
        </Frame>
      </Frame>
    </PageFrame>
  );
};
export default SearchPage;
