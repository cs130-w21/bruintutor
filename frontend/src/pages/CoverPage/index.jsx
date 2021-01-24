import PageFrame from "../../components/PageFrame";
import AppButton from "../../components/AppButton";
import { useHistory } from "react-router-dom";
import { themeColors } from "../../config.js";

const CoverPage = () => {
  const history = useHistory();
  return (
    <PageFrame
      headerRight={
        <AppButton
          style={{
            backgroundColor: "transparent",
            color: themeColors.darkblue,
            margin: 0,
            width: 100,
          }}
          onClick={() => history.push("/auth")}
        >
          Sign In
        </AppButton>
      }
    ></PageFrame>
  );
};
export default CoverPage;
