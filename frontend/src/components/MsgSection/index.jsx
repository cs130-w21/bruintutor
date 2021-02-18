import ProfileFrame from "../ProfileFrame";
import MsgModal from "../MsgModal";
import { useState } from "react";

const MsgSection = ({ uid, targetUid, userStore }) => {
  const [msgModalOn, setMsgModalOn] = useState(true);

  return (
    <ProfileFrame style={{ width: 300, height: 400, margin: 10 }}>
      {msgModalOn && (
        <MsgModal
          uid={uid}
          targetUid={targetUid}
          userStore={userStore}
          closeModal={() => {
            setMsgModalOn(false);
          }}
        />
      )}
    </ProfileFrame>
  );
};
export default MsgSection;
