import { useState, useEffect } from "react";
import { themeColors } from "../../config";
import Frame from "../Frame";
import TouchableOpacity from "../TouchableOpacity";
import styles from "./styles.jsx";

const Block = ({ level, children, onClick, onContextMenu }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.block,
        alignItems: "center",
        backgroundColor:
          level > 1
            ? themeColors.green
            : level == 1
            ? themeColors.halfgreen
            : "transparent",
      }}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {children}
    </TouchableOpacity>
  );
};

const DayMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};


const Calendar = ({
  data = [],
  setData = () => {},
  width,
  height,
  style,
  editable = false,
}) => {
  const bytes = data;
  const calendar = [];
  const changeByte = (i, j, d) => {
    const newBytes = [...bytes];
    newBytes[6 * i + j] += d;
    if (newBytes[6 * i + j] >= 0 && newBytes[6 * i + j] <= 1) {
      setData(newBytes);
    }
  };
  for (let i = 0; i < 7; i++) {
    const column = [];
    column.push(<Block level={0}>{DayMap[i]}</Block>);
    for (let j = 0; j < 6; j++) {
      const byte = bytes[6 * i + j];
      column.push(
        <Block
          onClick={() => {
            if (editable) {
              changeByte(i, j, 1);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (editable) {
              changeByte(i, j, -1);
            }
          }}
          level={byte}
        >
          {String(9 + 2 * j) + "-" + String(9 + 2 * j + 2)}
        </Block>
      );
    }
    calendar.push(
      <Frame style={{ ...styles.column, width: width / 7, height }}>
        {column}
      </Frame>
    );
  }
  return <Frame style={{ ...styles.row, ...style }}>{calendar}</Frame>;
};

export default Calendar;
