import { themeColors } from "../../config";

export default {
  bar: {
    position: "absolute",
    top: 70,
    right: 0,
    bottom: 70,
    width: 200,
    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
    backgroundColor: themeColors.transparentBlack,
    zIndex: 11,
    justifyContent: "flex-start",
    overflow: "auto",
  },
  card: {
    flexDirection: "column",
    alignSelf: "stretch",
    padding: 10,
    overflow: "auto",
    backgroundColor: themeColors.lightgray,
    margin: 2,
  },
  prompt: {
    alignSelf: "stretch",
    backgroundColor: themeColors.darkgray,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: themeColors.black,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  optionBtn: {
    padding: 5,
    flex: 1,
    borderRadius: 5,
    margin: 5,
    height: "auto",
  },
};
