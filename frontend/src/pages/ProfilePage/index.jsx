import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import InfoSection from "../../components/InfoSection";
import MsgSection from "../../components/MsgSection";
import CourseSection from "../../components/CourseSection";
import CalendarSection from "../../components/CalendarSection";
import ContactSection from "../../components/ContactSection";
import { useEffect, useState } from "react";

const ProfilePage = ({ match, uid }) => {
  const [profileInfo, setProfileInfo] = useState();
  useEffect(() => {
    // TO DO: fetch user info from server
    setProfileInfo({
      uid: "test",
      firstName: "Joe",
      lastName: "Bruin",
      major: "Computer Science",
      year: 3,
      rating: 3,
    });
  }, []);
  const setProfileUrl = (url) =>
    setProfileInfo({
      ...profileInfo,
      profileUrl: url,
    });
  const isOwner = match.params.id === uid;
  return (
    <PageFrame>
      <Frame
        style={{
          flexDirection: "column",
          margin: "auto",
          overflow: "auto",
        }}
      >
        <Frame
          style={{
            flexDirection: "row",
            margin: "auto",
          }}
        >
          <Frame>
            {profileInfo && (
              <InfoSection
                isOwner={isOwner}
                uid={profileInfo.uid}
                profileUrl={profileInfo.profileUrl}
                setProfileUrl={setProfileUrl}
                firstName={profileInfo.firstName}
                lastName={profileInfo.lastName}
                year={profileInfo.year}
                major={profileInfo.major}
              />
            )}
            <MsgSection />
          </Frame>
          <Frame>
            <CourseSection />
            <CalendarSection />
          </Frame>
          <Frame>
            <ContactSection />
          </Frame>
        </Frame>
      </Frame>
    </PageFrame>
  );
};
export default ProfilePage;
