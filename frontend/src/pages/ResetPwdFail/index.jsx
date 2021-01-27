import Frame from "../../components/Frame";
import PageFrame from "../../components/PageFrame";
import Text from "../../components/Text";
import AppButton from "../../components/AppButton";
import { themeColors } from "../../config.js";
import { useHistory } from "react-router-dom";

const ResetPwdFail = () => {
    const history = useHistory();
    return(
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
            Reset
          </AppButton>
        }>
        <Frame>
            <Text>Reset password fail! Please try again.</Text>
        </Frame>
      </PageFrame>
    )
}

export default ResetPwdFail;