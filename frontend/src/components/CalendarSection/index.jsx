import ProfileFrame from "../ProfileFrame";
import Calendar from "../Calendar";
import AppButton from "../AppButton";
import Text from "../Text";
import { useEffect, useState } from "react";
import { themeColors } from "../../config";
import { getSchedule, setSchedule } from "../../api";

const CalendarSection = ({ targetUid, editable }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [calendarData, setCalendarData] = useState();

  const retrieveSchedule = async () => {
    const res = await getSchedule(targetUid);
    if (res.error) {
      window.alert(res.errMsg);
      setCalendarData(Array(42).fill(0));
    } else {
      const data = res.data;
      if (data.bytes.length !== 42) setCalendarData(Array(42).fill(0));
      else setCalendarData(data.bytes);
    }
    console.log("retrieving schedule");
  };

  const saveSchedule = async () => {
    const res = await setSchedule(targetUid, calendarData);
    if (res.error) {
      window.alert(res.errMsg);
    }
  };

  useEffect(() => {
    if (targetUid) retrieveSchedule();
  }, [targetUid]);

  return (
    <ProfileFrame style={{ width: 500, height: 500, margin: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        Schedule
      </Text>
      <Calendar
        data={calendarData}
        setData={setCalendarData}
        editable={onEdit}
        width={400}
        height={300}
        style={{
          fontWeight: "bold",
          color: themeColors.white,
          backgroundColor: onEdit
            ? themeColors.black
            : themeColors.transparentBlack,
        }}
      />
      {editable && (
        <AppButton
          style={{ height: 30, width: 100 }}
          onClick={() => {
            if (onEdit) {
              saveSchedule();
            }
            setOnEdit(!onEdit);
          }}
        >
          {onEdit ? "Save" : "Edit"}
        </AppButton>
      )}
    </ProfileFrame>
  );
};
export default CalendarSection;
