import ProfileFrame from "../ProfileFrame";
import TouchableOpacity from "../TouchableOpacity";
import styles from "./styles.jsx";

const ContactCard = ({ entry, onClick }) => {
  return (
    <TouchableOpacity style={styles.card} onClick={onClick}>
      {entry.firstName + " " + entry.lastName}
    </TouchableOpacity>
  );
};
const ContactSection = ({ uid, contacts, userStore, setMsgUid }) => {
  const contactUsers = contacts.map((uid) => userStore[uid]);
  const entries = contactUsers.map((user) => (
    <ContactCard entry={user} onClick={() => setMsgUid(user.uid)} />
  ));
  return (
    <ProfileFrame
      style={{
        width: 200,
        height: 720,
        margin: 10,
        justifyContent: "flex-start",
      }}
    >
      {entries}
    </ProfileFrame>
  );
};
export default ContactSection;
