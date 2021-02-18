import { themeColors } from "../../config.js";

export default {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    position: "relative",
  },
  title: {
    backgroundColor: themeColors.darkblue,
    color: themeColors.lightgray,
    alignSelf: "stretch",
    height: 30,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
    fontSize: 15,
  },
  msgLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  msgBubble: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: themeColors.darkblue,
    color: themeColors.lightgray,
  },
  msgSection: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
    borderRadius: 10,
    overflow: "auto",
  },
  commentSection: {
    height: 100,
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
  },
};
