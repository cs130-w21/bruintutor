import Frame from "../Frame";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import styles from "./styles";
import { NotificationTypes, themeColors } from "../../config";
import AppButton from "../AppButton";
import { tutorRespondRequest } from "../../api";
import { useHistory } from "react-router-dom";

const NotificationCard = ({
  userStore,
  notification,
  checkNotification,
  contacts,
  setContacts,
}) => {
  const history = useHistory();
  const fromUser = userStore[notification.from];
  const fromName = fromUser
    ? fromUser.firstName + " " + fromUser.lastName
    : "Unknown";
  return (
    <TouchableOpacity
      style={styles.card}
      onClick={() => {
        checkNotification(notification.notificationID);
        history.push("/profile/" + notification.from);
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{notification.msg}</Text>
      <Text style={{ fontSize: 12 }}>from {fromName}</Text>
      {notification.type === NotificationTypes.INVITE ? (
        <Frame style={styles.prompt}>
          <Text>Accept invitation from {fromName}?</Text>
          <Frame style={styles.buttons}>
            <AppButton
              style={styles.optionBtn}
              onClick={async () => {
                const res = await tutorRespondRequest(
                  notification.from,
                  notification.to
                );
                if (res.error) {
                  window.alert(res.errMsg);
                } else {
                  checkNotification(notification.notificationID);
                  setContacts([...contacts, notification.from]);
                  history.push("/profile/" + notification.from);
                }
              }}
            >
              Yes
            </AppButton>
            <AppButton
              style={{
                ...styles.optionBtn,
                backgroundColor: themeColors.black,
                color: themeColors.white,
              }}
              onClick={() => {
                checkNotification(notification.notificationID);
              }}
            >
              No
            </AppButton>
          </Frame>
        </Frame>
      ) : notification.type === NotificationTypes.TERMINATE ? (
        <Frame style={styles.prompt}>
          <Text>Finish tutoring {notification.from}?</Text>
          <Frame style={styles.buttons}>
            <AppButton style={styles.optionBtn}>Yes</AppButton>
            <AppButton
              style={{
                ...styles.optionBtn,
                backgroundColor: themeColors.black,
                color: themeColors.white,
              }}
            >
              No
            </AppButton>
          </Frame>
        </Frame>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const NotificationBar = ({
  userStore,
  checkNotification,
  notifications,
  contacts,
  setContacts,
}) => {
  const notificationEntries = notifications.map((notification, index) => (
    <NotificationCard
      key={index}
      userStore={userStore}
      checkNotification={checkNotification}
      notification={notification}
      contacts={contacts}
      setContacts={setContacts}
    />
  ));
  return <Frame style={styles.bar}>{notificationEntries}</Frame>;
};
export default NotificationBar;
