import { themeColors } from "../../config";

export default {
  cardBox: {
    width: 250,
    height: 250,
    backgroundColor: themeColors.lightgray,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: themeColors.darkblue,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  major: {
    fontSize: 16,
  },
  class: {
    fontSize: 14,
    color: themeColors.red,
  },
  tutorList: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rating: {
    color: themeColors.yellow,
    fontSize: 18,
    textShadow: "1px 1px 2px #DAA520",
  },
};
