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
import {
  getProfile,
  uploadProfilePicture,
  downloadProfilePicture,
  deleteNotification,
} from "../../api";
import TouchableOpacity from "../../components/TouchableOpacity";
import { icons, themeColors } from "../../config";
import AppButton from "../../components/AppButton";

const ProfilePage = ({
  match,
  uid,
  userStore,
  contacts,
  notificationOn,
  notifications,
  setNotificationOn,
  setUserStore,
  removeNotification,
  logOut,
}) => {
  const [profileInfo, setProfileInfo] = useState();
  const [targetUid, setTargetUid] = useState();
  const [msgUid, setMsgUid] = useState();
  const history = useHistory();
  const fetchInfo = async () => {
    const res = await getProfile(match.params.id);
    const res2 = await downloadProfilePicture(match.params.id);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      let url;
      if (res2.error) {
        window.alert(res2.errMsg);
      } else {
        url = res2.data.profilePicUrl;
      }
      const data = res.data;
      data.uid = match.params.id;
      data.profileUrl = url;
      setProfileInfo(data);
      setUserStore({
        ...userStore,
        [match.params.id]: data,
      });
      setTargetUid(match.params.id);
    }
  };
  useEffect(() => {
    fetchInfo();
    if (!isOwner) setMsgUid(match.params.id);
    else {
      setMsgUid("");
    }
    console.log("fetching user info");
  }, [match.params.id, uid]);

  const setProfileUrl = async (url) => {
    const res = await uploadProfilePicture(uid, url);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      setProfileInfo({
        ...profileInfo,
        profileUrl: url,
      });
    }
  };

  const isOwner = match.params.id === uid;
  if (!profileInfo) {
    return <div></div>;
  } else
    return (
      <PageFrame
        onTitleClick={() => history.push("/search/")}
        headerRight={
          <Frame style={{ flexDirection: "row" }}>
            <AppButton
              style={{
                height: "auto",
                width: "auto",
                padding: 5,
                borderRadius: 5,
              }}
              onClick={async () => {
                await logOut();
                history.push("/");
              }}
            >
              Logout
            </AppButton>
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
          </Frame>
        }
      >
        {notificationOn && (
          <NotificationBar
            checkNotification={async (notifId) => {
              const res = await deleteNotification(uid, notifId);
              if (!res.error) removeNotification(notifId);
            }}
            userStore={userStore}
            notifications={notifications}
          />
        )}
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
                  targetUid={targetUid}
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
