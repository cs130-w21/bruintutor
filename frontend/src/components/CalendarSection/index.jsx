import ProfileFrame from "../ProfileFrame";
import Calendar from "../Calendar";
import AppButton from "../AppButton";
import Text from "../Text";
import { useEffect, useState } from "react";
import { themeColors } from "../../config";
const CalendarSection = () => {
  const [onEdit, setOnEdit] = useState(false);
  const [calendarData, setCalendarData] = useState();

  useEffect(() => {
    /*
    request backend for the calendar data
     */
    setCalendarData(Array(42).fill(0));
  }, []);

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
      <AppButton
        style={{ height: 30, width: 100 }}
        onClick={() => setOnEdit(!onEdit)}
      >
        {onEdit ? "Save" : "Edit"}
      </AppButton>
    </ProfileFrame>
  );
};
export default CalendarSection;
