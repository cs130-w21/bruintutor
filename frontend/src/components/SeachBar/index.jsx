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
import { Slider } from "antd";
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

const marks = {
  0: { style: styles.rating, label: "1★" },
  25: { style: styles.rating, label: "2★" },
  50: { style: styles.rating, label: "3★" },
  75: { style: styles.rating, label: "4★" },
  100: { style: styles.rating, label: "5★" },
};

const SearchBar = () => {
  const [classes, setClasses] = useState([]);
  const [rating, setRating] = useState([0, 100]);
  const [schedule, setSchedule] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

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
  return (
    <Frame style={styles.container}>
      <Frame style={{ flexDirection: "row" }}>
        <AppTextInput style={styles.searchInput} placeholder={"Search"} />
        <AppButton style={styles.searchBtn}>Go</AppButton>
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
          setSchedule([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ]);
        }}
        content={
          <Calendar
            data={schedule}
            width={200}
            height={100}
            editable={true}
            style={{ margin: 10, fontSize: 8, color: themeColors.white }}
          />
        }
      />
      <FilterCard
        name="Rating"
        height={50}
        cancelFunc={() => setRating([0, 100])}
        content={
          <Frame
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
            }}
          >
            <Slider
              tipFormatter={null}
              style={{ width: 150, overflow: "visible" }}
              range
              marks={marks}
              step={null}
              value={rating}
              onChange={setRating}
              range={{ draggableTrack: true }}
            />
          </Frame>
        }
      />
    </Frame>
  );
};
export default SearchBar;
