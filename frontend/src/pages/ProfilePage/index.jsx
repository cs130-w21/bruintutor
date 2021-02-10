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
      classes: [
        "CS 111",
        "COMSCI 131",
        "CS 130",
        "MATH 143",
        "CS 111",
        "CHEM 131",
        "CS 130",
        "PHYSICS 143",
        "CS 111",
      ],
      messages: [],
      notifications: [],
    });
  }, []);
  const setProfileUrl = (url) =>
    setProfileInfo({
      ...profileInfo,
      profileUrl: url,
    });
  const isOwner = match.params.id === uid;
  if (!profileInfo) {
    return <div></div>;
  } else
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
              <MsgSection uid={uid} hostUid={profileInfo.uid} />
            </Frame>
            <Frame>
              {profileInfo && <CourseSection classes={profileInfo.classes} />}
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
