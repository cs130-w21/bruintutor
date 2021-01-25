import { themeColors } from "../../config";

export default {
  frame: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  fileSelector: {
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    zIndex: 10,
    pointerEvents: "none",
    border: "1px solid gray",
    backgroundColor: themeColors.black,
  },
};
