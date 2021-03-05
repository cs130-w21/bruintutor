import Frame from "../../components/Frame";
import PageFrame from "../../components/PageFrame";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Text from "../../components/Text";
import { resetPwd } from "../../api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ResetPasswordPage = ({ match }) => {
  const history = useHistory();
  const [passwd, setPassWd] = useState("");
  const [passwd_2, setPassWd_2] = useState("");
  const handleResetPwd = async () => {
    if (passwd === passwd_2) {
      const res = await resetPwd(passwd, match.params.secret);
      if (res.error) {
        window.alert(res.errMsg);
        history.push("/result/failure");
      } else {
        history.push("/result/success");
      }
    } else {
      window.alert("Passwords don't match!");
    }
  };
  return (
    <PageFrame>
      <Frame>
        <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
          Reset Password
        </Text>
        <AppTextInput
          placeholder="Password"
          value={passwd}
          type={"password"}
          autoComplete="on"
          onInput={(e) => setPassWd(e.target.value)}
        />
        <AppTextInput
          placeholder="Confirm Password"
          value={passwd_2}
          type={"password"}
          onInput={(e) => setPassWd_2(e.target.value)}
        />
        <AppButton onClick={handleResetPwd}>Change</AppButton>
      </Frame>
    </PageFrame>
  );
};

export default ResetPasswordPage;
