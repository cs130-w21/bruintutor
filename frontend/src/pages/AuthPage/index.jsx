import Frame from "../../components/Frame";
import PageFrame from "../../components/PageFrame";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Text from "../../components/Text";
import { themeColors, AuthStates } from "../../config";
import { useState } from "react";

const AuthPage = () => {
  const [authState, setAuthState] = useState(AuthStates.SIGNIN);
  const [email, setEmail] = useState("");
  const [passwd, setPassWd] = useState("");
  const [passwd_2, setPassWd_2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  switch (authState) {
    case AuthStates.SIGNIN:
      return (
        <PageFrame>
          <Frame>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
              Sign In
            </Text>
            <AppTextInput
              placeholder="Email"
              value={email}
              type={"email"}
              autoComplete="on"
              onInput={(e) => setEmail(e.target.value)}
            />
            <AppTextInput
              placeholder="Password"
              value={passwd}
              type={"password"}
              autoComplete="on"
              onInput={(e) => setPassWd(e.target.value)}
            />
            <AppButton>Sign In</AppButton>
            <AppButton
              style={{
                backgroundColor: "transparent",
                color: themeColors.darkblue,
                margin: 0,
              }}
              onClick={() => setAuthState(AuthStates.FORGETPWD)}
            >
              Forget Password
            </AppButton>
            <AppButton
              style={{
                backgroundColor: "transparent",
                color: themeColors.darkblue,
                margin: 0,
              }}
              onClick={() => setAuthState(AuthStates.SIGNUP)}
            >
              Create Account
            </AppButton>
          </Frame>
        </PageFrame>
      );
    case AuthStates.SIGNUP:
      return (
        <PageFrame>
          <Frame>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
              Create Account
            </Text>
            <AppTextInput
              placeholder="First Name"
              value={firstName}
              autoComplete="on"
              onInput={(e) => setFirstName(e.target.value)}
            />
            <AppTextInput
              placeholder="Last Name"
              value={lastName}
              autoComplete="on"
              onInput={(e) => setLastName(e.target.value)}
            />
            <AppTextInput
              placeholder="Email"
              value={email}
              type={"email"}
              autoComplete="on"
              onInput={(e) => setEmail(e.target.value)}
            />
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
            <AppButton>Create</AppButton>
            <AppButton
              style={{
                backgroundColor: "transparent",
                color: themeColors.darkblue,
                margin: 0,
              }}
              onClick={() => setAuthState(AuthStates.SIGNIN)}
            >
              Already have an account?
            </AppButton>
          </Frame>
        </PageFrame>
      );
    case AuthStates.FORGETPWD:
      return (
        <PageFrame>
          <Frame>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
              Forgot Password
            </Text>
            <Text style={{ width: 300, margin: 20 }}>
              Please enter the email associated with your account below. We’ll
              send your password reset link right away
            </Text>
            <AppTextInput
              placeholder="Email"
              value={email}
              type={"email"}
              onInput={(e) => setEmail(e.target.value)}
            />
            <AppButton>Send</AppButton>
            <AppButton
              style={{
                backgroundColor: "transparent",
                color: themeColors.darkblue,
                margin: 0,
              }}
              onClick={() => setAuthState(AuthStates.SIGNIN)}
            >
              Sign In
            </AppButton>
          </Frame>
        </PageFrame>
      );
  }
};
export default AuthPage;
