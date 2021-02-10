import ProfileFrame from "../ProfileFrame";
import AppButton from "../AppButton";
import TextBox from "../TextBox";
import { sendMsg } from "../../api";
import { useState } from "react";

const MsgSection = ({ uid, hostUid }) => {
  const [msg, setMsg] = useState("");
  const handleClick = async () => {
    const res = await sendMsg(uid, hostUid, msg);
    if (!res.error) {
      setMsg("");
      window.alert("Message sent!");
    } else {
      window.alert("Message not sent: " + res.errMsg);
    }
  };
  return (
    <ProfileFrame style={{ width: 300, height: 400, margin: 10 }}>
      <TextBox changeText={setMsg} text={msg} />
      <AppButton
        style={{ width: 150, height: 40, alignText: "center" }}
        onClick={handleClick}
      >
        Send Message
      </AppButton>
    </ProfileFrame>
  );
};
export default MsgSection;
