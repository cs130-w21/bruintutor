import ProfileFrame from "../ProfileFrame";
import ProfilePicture from "../ProfilePicture";
import Text from "../Text";
import Frame from "../Frame";
import AppButton from "../AppButton";
import { useHistory } from "react-router-dom";
import { themeColors } from "../../config";

const formatYear = (year) => {
  if (0 < year < 5) return ["Student", "1st", "2rd", "3rd", "4th"][year];
  else return "Graduated";
};

const InfoSection = ({
  profileUrl,
  setProfileUrl,
  isOwner,
  firstName,
  lastName,
  major,
  year,
  uid,
  isTutor,
  targetUid,
}) => {
  const history = useHistory();
  return (
    <ProfileFrame
      style={{ width: 300, height: 300, margin: 10, position: "relative" }}
    >
      <Frame
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          padding: 5,
          borderRadius: 10,
          backgroundColor: isTutor ? themeColors.darkblue : themeColors.green,
          color: themeColors.white,
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        {isTutor ? "Tutor" : "Student"}
      </Frame>

      <ProfilePicture
        url={profileUrl}
        setUrl={setProfileUrl}
        editable={isOwner}
        radius={50}
      />
      <Frame style={{ flexDirection: "row", margin: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {firstName + " " + lastName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "normal",
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          {"|"}
        </Text>
        <Text style={{ fontSize: 16 }}>{formatYear(year)}</Text>
      </Frame>
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
        {major}
      </Text>
      {isOwner ? (
        <AppButton
          style={{ width: 100, height: 30 }}
          onClick={() =>
            history.push({
              pathname: "/edit_profile/" + targetUid,
              firstName,
              lastName,
              major,
              year,
            })
          }
        >
          Edit Profile
        </AppButton>
      ) : (
        <AppButton
          style={{ width: 120, height: 30 }}
          onClick={() => {
            history.push("/profile/" + uid);
          }}
        >
          Back to Profile
        </AppButton>
      )}
    </ProfileFrame>
  );
};
export default InfoSection;
