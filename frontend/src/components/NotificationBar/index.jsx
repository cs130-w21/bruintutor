import Frame from "../Frame";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import styles from "./styles";
import { NotificationTypes, themeColors } from "../../config";
import AppButton from "../AppButton";
import { tutorRespondRequest } from "../../api";
import { useHistory } from "react-router-dom";

const NotificationCard = ({ notification, checkNotification }) => {
  const history = useHistory();
  return (
    <TouchableOpacity
      style={styles.card}
      onClick={() => {
        checkNotification(notification.notificationID);
        history.push("/profile/" + notification.from);
      }}
    >
      <Text>{notification.msg}</Text>
      {notification.type === NotificationTypes.INVITE ? (
        <Frame style={styles.prompt}>
          <Text>Accept invitation from {notification.from}?</Text>
          <Frame style={styles.buttons}>
            <AppButton
              style={styles.optionBtn}
              onClick={async () => {
                await tutorRespondRequest(notification.from, notification.to);
                checkNotification(notification.notificationID);
                history.push("/profile/" + notification.from);
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

const NotificationBar = ({ checkNotification, notifications }) => {
  const notificationEntries = notifications.map((notification, index) => (
    <NotificationCard
      key={index}
      checkNotification={checkNotification}
      notification={notification}
    />
  ));
  return <Frame style={styles.bar}>{notificationEntries}</Frame>;
};
export default NotificationBar;
