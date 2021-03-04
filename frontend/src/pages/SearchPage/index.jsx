import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SeachBar";
import TutorList from "../../components/TutorList";
import NotificationBar from "../../components/NotificationBar";
import TouchableOpacity from "../../components/TouchableOpacity";
import Text from "../../components/Text";
import { icons, themeColors } from "../../config";
const SearchPage = ({
  uid,
  userStore,
  matchedTutors,
  setMatchedTutors,
  notificationOn,
  notifications,
  setNotificationOn,
}) => {
  const history = useHistory();
  const tutors = [];
  console.log(matchedTutors, userStore);
  matchedTutors.map((tutorId) => {
    if (tutorId in userStore) tutors.push(userStore[tutorId]);
  });
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
          {notifications.length > 0 && (
            <Text
              style={{
                position: "absolute",
                top: 15,
                right: 13,
                backgroundColor: themeColors.red,
                borderRadius: "50%",
                width: 5,
                height: 5,
              }}
            ></Text>
          )}
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
          <SearchBar setMatchedTutors={setMatchedTutors} />
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
