import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import InfoSection from "../../components/InfoSection";
import MsgSection from "../../components/MsgSection";
import CourseSection from "../../components/CourseSection";
import CalendarSection from "../../components/CalendarSection";
import ContactSection from "../../components/ContactSection";
import NotificationBar from "../../components/NotificationBar";
import Text from "../../components/Text";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfile, uploadProfilePicture } from "../../api";
import TouchableOpacity from "../../components/TouchableOpacity";
import { icons, themeColors } from "../../config";

const ProfilePage = ({
  match,
  uid,
  userStore,
  contacts,
  notificationOn,
  notifications,
  setNotificationOn,
}) => {
  const [profileInfo, setProfileInfo] = useState();
  const [targetUid, setTargetUid] = useState();
  const [msgUid, setMsgUid] = useState();
  const history = useHistory();
  const fetchInfo = async () => {
    const res = await getProfile(match.params.id);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setProfileInfo(data);
      setTargetUid(match.params.id);
    }
  };
  useEffect(() => {
    fetchInfo();
    console.log("fetching user info");
  }, [match.params.id]);

  const setProfileUrl = async (url) => {
    await uploadProfilePicture(uid, url);
    setProfileInfo({
      ...profileInfo,
      profileUrl: url,
    });
  };

  const isOwner = match.params.id === uid;
  if (!profileInfo) {
    return <div></div>;
  } else
    return (
      <PageFrame
        onTitleClick={() => history.push("/search/")}
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
            flexDirection: "column",
            margin: "auto",
            overflow: "auto",
          }}
        >
          <Frame
            style={{
              flexDirection: "row",
              margin: "auto",
            }}
          >
            <Frame
              style={{ justifyContent: "flex-start", alignSelf: "stretch" }}
            >
              {profileInfo && (
                <InfoSection
                  isOwner={isOwner}
                  uid={uid}
                  targetUid={profileInfo.uid}
                  profileUrl={profileInfo.profileUrl}
                  setProfileUrl={setProfileUrl}
                  firstName={profileInfo.firstName}
                  lastName={profileInfo.lastName}
                  year={profileInfo.year}
                  isTutor={profileInfo.isTutor}
                  major={profileInfo.major}
                />
              )}
              {msgUid && (
                <MsgSection
                  uid={uid}
                  msgUid={msgUid}
                  userStore={userStore}
                  setMsgUid={setMsgUid}
                />
              )}
            </Frame>
            <Frame>
              {profileInfo && <CourseSection classes={profileInfo.classes} />}
              <CalendarSection targetUid={targetUid} editable={isOwner} />
            </Frame>
            <Frame>
              {profileInfo && (
                <ContactSection
                  userStore={userStore}
                  contacts={contacts}
                  setMsgUid={setMsgUid}
                />
              )}
            </Frame>
          </Frame>
        </Frame>
      </PageFrame>
    );
};

export default ProfilePage;
