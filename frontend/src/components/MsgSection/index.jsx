import ProfileFrame from "../ProfileFrame";
import MsgModal from "../MsgModal";
import { useState } from "react";

const MsgSection = ({ uid, msgUid, setMsgUid, userStore }) => {
  return (
    <ProfileFrame style={{ width: 300, height: 400, margin: 10 }}>
      {msgUid && (
        <MsgModal
          uid={uid}
          msgUid={msgUid}
          userStore={userStore}
          closeModal={() => {
            setMsgUid("");
          }}
        />
      )}
    </ProfileFrame>
  );
};
export default MsgSection;
