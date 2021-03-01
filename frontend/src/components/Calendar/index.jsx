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
        alignItems: "flex-start",
        backgroundColor:
          level > 1
            ? themeColors.green
            : level == 1
            ? themeColors.halfgreen
            : themeColors.darkgray,
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

const Calendar = ({ data = [[]], width, height, style, editable = false }) => {
  const [bytes, setBytes] = useState(data);
  useEffect(() => {
    setBytes(data);
  }, [data]);
  const calendar = [];
  const changeByte = (i, j, d) => {
    const newBytes = JSON.parse(JSON.stringify(bytes));
    newBytes[i][j] += d;
    if (newBytes[i][j] >= 0 && newBytes[i][j] <= 1) setBytes(newBytes);
  };
  for (let i = 0; i < bytes.length; i++) {
    const row = bytes[i];
    const column = [];
    column.push(<Block level={0}>{DayMap[i]}</Block>);
    for (let j = 0; j < row.length; j++) {
      const byte = row[j];
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
