import Modal from "../Modal";
import TouchableOpacity from "../TouchableOpacity";
import Frame from "../Frame";
import AppButton from "../AppButton";
import TextBox from "../TextBox";
import Text from "../Text";
import styles from "./style.js";
import { useState, useEffect } from "react";
import { themeColors, icons, NotificationTypes } from "../../config.js";
import { getMsgs, sendMsg, addNotification } from "../../api";

const MsgLine = ({ message, uid, msgUid }) => {
  return (
    <div
      style={{
        ...styles.msgLine,
        alignSelf: message.from === uid ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.msgBubble,
          backgroundColor:
            message.from === uid ? themeColors.darkblue : themeColors.black,
        }}
      >
        {message.msg}
      </div>
    </div>
  );
};

const MsgModal = ({ uid, msgUid, closeModal, userStore }) => {
  const [text, changeText] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    retrieveMsgs();
  }, [uid, msgUid]);

  const retrieveMsgs = async () => {
    const res = await getMsgs(uid, msgUid);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      if (res.data) {
        setMessages(res.data.messages);
      }
    }
  };

  const checkMessage = (msg) => {
    return !(msg === "" || msg.length > 140);
  };

  const sendMessage = async (msg) => {
    if (checkMessage(msg)) {
      const res = await sendMsg(uid, msgUid, msg);
      if (!res.error) {
        changeText("");
        const newMessages = [...messages];
        newMessages.push(res.data);
        setMessages(newMessages);
      } else {
        window.alert("Message not sent: " + res.errMsg);
      }
    } else {
      window.alert("Message is invalid");
    }
  };

  let msgLines = [];

  if (messages)
    messages.map((msg) => {
      msgLines.push(<MsgLine message={msg} uid={uid} msgUid={msgUid} />);
    });

  return (
    <div style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onClick={() => closeModal()}>
        {icons.close}
      </TouchableOpacity>
      {userStore[msgUid] ? (
        <Frame style={styles.msgContainer}>
          <Text style={styles.title}>
            {userStore[msgUid].firstName + " " + userStore[msgUid].lastName}
          </Text>
          <Frame style={styles.msgSection}>
            {msgLines.length === 0 ? (
              <Text style={{ margin: "auto" }}>No Messages Sent</Text>
            ) : (
              msgLines
            )}
          </Frame>
        </Frame>
      ) : (
        <></>
      )}
      <Frame style={styles.commentSection}>
        <TextBox
          style={{
            alignSelf: "stretch",
            backgroundColor: themeColors.white,
            width: "auto",
          }}
          text={text}
          changeText={changeText}
        />
      </Frame>
      <AppButton
        style={{
          height: 30,
          width: 100,
          alignText: "center",
          alignSelf: "center",
          margin: 0,
        }}
        onClick={async () => {
          await sendMessage(text);
          if (messages.length === 0) {
            await addNotification(msgUid, {
              msg: text,
              createdDate: Date.now(),
              read: false,
              type: NotificationTypes.INVITE,
              from: uid,
              to: msgUid,
            });
          } else {
            await addNotification(msgUid, {
              msg: text,
              createdDate: Date.now(),
              read: false,
              type: NotificationTypes.MSG,
              from: uid,
              to: msgUid,
            });
          }
        }}
      >
        Send
      </AppButton>
    </div>
  );
};

export default MsgModal;
