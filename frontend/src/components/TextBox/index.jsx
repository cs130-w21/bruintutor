import { useState, useRef } from "react";
import { themeColors } from "../../config";

const TextBox = ({ style, text, changeText }) => {
  const textBox = useRef();
  if (textBox.current) {
    if (text == "") textBox.current.innerText = text;
  }
  return (
    <div
      style={{
        width: 200,
        height: 100,
        padding: 10,
        borderRadius: 5,
        fontSize: 15,
        backgroundColor: themeColors.lightgray,
        overflow: "auto",
        ...style,
      }}
      ref={(ref) => (textBox.current = ref)}
      onInput={() => changeText(textBox.current.innerText)}
      contentEditable
    ></div>
  );
};

export default TextBox;
