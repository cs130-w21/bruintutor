import styles from "./styles.jsx";
import AppTextInput from "../AppTextInput";
import AppButton from "../AppButton";
import AppDropDown from "../DropDown";
import Calendar from "../Calendar";
import Course from "../../components/Course";
import Frame from "../Frame";
import Text from "../Text";
import { useState } from "react";
import { icons, themeColors } from "../../config.js";
import { searchTutors } from "../../api";
import "antd/dist/antd.css";

const FilterCard = ({ name, content, height, cancelFunc }) => {
  const [isOn, setOn] = useState(false);
  return (
    <Frame>
      <AppButton
        style={styles.filterCard}
        onClick={() => {
          if (isOn) cancelFunc();
          setOn(!isOn);
        }}
      >
        <Text style={styles.cardText}>{name}</Text>
        <Frame style={styles.addFilterBtn}>
          {isOn ? icons.remove : icons.add}
        </Frame>
      </AppButton>
      <Frame style={{ ...styles.content, height: isOn ? height : 0 }}>
        {content}
      </Frame>
    </Frame>
  );
};

const zeros = Array(42).fill(0);

const SearchBar = ({ setMatchedTutors }) => {
  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState(zeros);
  const [name, setName] = useState("");

  const addClass = (entry) => {
    if (classes.indexOf(entry) === -1) setClasses([...classes, entry]);
  };

  const deleteClass = (entry) => {
    const index = classes.indexOf(entry);
    const newClasses = [...classes];
    if (index !== -1) {
      newClasses.splice(index, 1);
      setClasses(newClasses);
    }
  };

  const handleSearch = async () => {
    const res = await searchTutors(name, classes, schedule);
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      const data = res.data;
      setMatchedTutors(data);
    }
  };

  return (
    <Frame style={styles.container}>
      <Frame style={{ flexDirection: "row" }}>
        <AppTextInput
          style={styles.searchInput}
          placeholder={"Search"}
          onInput={(e) => setName(e.target.value)}
          value={name}
        />
        <AppButton style={styles.searchBtn} onClick={handleSearch}>
          Go
        </AppButton>
      </Frame>
      <FilterCard
        name="Classes"
        height={200}
        cancelFunc={() => setClasses([])}
        content={
          <Frame
            style={{
              justifyContent: "flex-start",
              flex: 1,
              alignSelf: "stretch",
              overflow: "auto",
            }}
          >
            <AppDropDown
              styles={{ width: 150, zIndex: 11 }}
              onSelect={addClass}
            ></AppDropDown>

            <Frame
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {classes.map((entry, index) => (
                <Course
                  key={index}
                  courseName={entry}
                  style={{
                    fontSize: 12,
                    margin: 5,
                    padding: 5,
                    backgroundColor: themeColors.darkgray,
                  }}
                  onClick={() => deleteClass(entry)}
                />
              ))}
            </Frame>
          </Frame>
        }
      />
      <FilterCard
        name="Availability"
        height={100}
        cancelFunc={() => {
          setSchedule(zeros);
        }}
        content={
          <Calendar
            data={schedule}
            setData={setSchedule}
            width={200}
            height={100}
            editable={true}
            style={{
              margin: 10,
              fontSize: 8,
              color: themeColors.white,
              backgroundColor: themeColors.darkgray,
            }}
          />
        }
      />
    </Frame>
  );
};
export default SearchBar;
