import ProfileFrame from "../ProfileFrame";
import TouchableOpacity from "../TouchableOpacity";
import AppButton from "../AppButton";
import styles from "./styles.jsx";
import Text from "../Text";
import { useHistory } from "react-router-dom";

const ContactCard = ({ entry, onClick, addToChat }) => {
  return (
    <TouchableOpacity style={styles.card} onClick={onClick}>
      <Text>{entry.firstName + " " + entry.lastName}</Text>
      <AppButton
        style={styles.btn}
        onClick={(e) => {
          e.stopPropagation();
          addToChat();
        }}
      >
        Chat
      </AppButton>
    </TouchableOpacity>
  );
};
const ContactSection = ({ uid, contacts, userStore, setMsgUid }) => {
  const contactUsers = contacts.map((uid) => userStore[uid]);
  const history = useHistory();
  const entries = contactUsers.map((user) => (
    <ContactCard
      entry={user}
      onClick={() => history.push("/profile/" + user.uid)}
      addToChat={() => setMsgUid(user.uid)}
    />
  ));
  return (
    <ProfileFrame
      style={{
        width: 200,
        height: 720,
        margin: 10,
        justifyContent: "flex-start",
        padding: 5,
        overflow: "auto",
      }}
    >
      {entries.length === 0 ? <Text>No contacts</Text> : entries}
    </ProfileFrame>
  );
};
export default ContactSection;
