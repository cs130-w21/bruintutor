import { CloseOutlined } from "@ant-design/icons";

export const themeColors = {
  darkblue: "#004D7F",
  lightgray: "#F0F0F0",
  darkgray: "#C4C4C4",
  black: "#444444",
  white: "#FFFFFF",
  transparentBlack: "rgba(0,0,0,0.4)",
  // put theme colors here
};

export const AuthStates = {
  SIGNIN: 0,
  SIGNUP: 1,
  FORGETPWD: 2,
  PROFILE_VIEW: 3,
  PROFILE_SAVE_CHANGES: 4,
};

export const icons = {
  close: <CloseOutlined style={{ color: "#FFFFFF" }} />,
};
