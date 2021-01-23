import ProfileFrame from "../../components/ProfileFrame";
import PageFrame from "../../components/PageFrame";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Text from "../../components/Text";
import { themeColors, AuthStates } from "../../config";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileRow from "../../components/ProfileRow";
import ProfileDescription from "../../components/ProfileDescription";
import ProfileItem from "../../components/ProfileItem";
import Line from "../../components/Line";
import HeaderSpacer from "../../components/HeaderSpacer";

const ProfilePage = () => {
  let history = useHistory();
  const [authState, setAuthState] = useState(AuthStates.PROFILE_VIEW);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [classes, setClasses] = useState("");
  switch (authState) {
    case AuthStates.PROFILE_VIEW:
      return (
        <PageFrame>
          <ProfileFrame>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
              Profile
            </Text>
            <ProfileRow>
              <ProfileDescription>
                First Name
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Last Name
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Email
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Year
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Major
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Classes
              </ProfileDescription>
              <ProfileItem>
                Placeholder
              </ProfileItem>
            </ProfileRow>
            <AppButton onClick={() => setAuthState(AuthStates.PROFILE_SAVE_CHANGES)}>
              Edit Profile
            </AppButton>
          </ProfileFrame>
        </PageFrame>
      );
    case AuthStates.PROFILE_SAVE_CHANGES:
      return (
        <PageFrame>
          <ProfileFrame>
            <HeaderSpacer>
            </HeaderSpacer>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
              Edit Profile
            </Text>
            <ProfileRow>
              <ProfileDescription>
                First Name
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="First Name"
                value={firstName}
                autoComplete="on"
                onInput={(e) => setFirstName(e.target.value)}
              />
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Last Name
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="Last Name"
                value={lastName}
                autoComplete="on"
                onInput={(e) => setLastName(e.target.value)}
              />
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Email
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="Email"
                value={email}
                type={"email"}
                autoComplete="on"
                onInput={(e) => setEmail(e.target.value)}
              />
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Year
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="Year"
                value={year}
                autoComplete="on"
                onInput={(e) => setYear(e.target.value)}
              />
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Major
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="Major"
                value={major}
                autoComplete="on"
                onInput={(e) => setMajor(e.target.value)}
              />
            </ProfileRow>
            <Line color="#F0F0F0"></Line>
            <ProfileRow>
              <ProfileDescription>
                Classes
              </ProfileDescription>
              <AppTextInput
                style={{ width: "70%" }}
                placeholder="Search for Class"
                value={classes}
                autoComplete="on"
                onInput={(e) => setClasses(e.target.value)}
              />
            </ProfileRow>
            <AppButton onClick={() => setAuthState(AuthStates.PROFILE_VIEW)}>
              Save Changes
            </AppButton>

          </ProfileFrame>
        </PageFrame>
      );

  }
};

export default ProfilePage;
