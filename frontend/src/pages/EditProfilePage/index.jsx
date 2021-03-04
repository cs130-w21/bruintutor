import Frame from "../../components/Frame";
import PageFrame from "../../components/PageFrame";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Text from "../../components/Text";
import AppDropDown from "../../components/DropDown";
import Course from "../../components/Course";
import { editProfile } from "../../api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const EditProfilePage = ({ uid }) => {
  // defined useState for the fields in the edit profile page
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMajor, setEditMajor] = useState("");
  const [editYear, setEditYear] = useState("");
  const [classes, setClasses] = useState([]);
  const history = useHistory();

  // ** Move to the search page as well
  // Move the selectedClass, setSelectedClass from drop down to edit profile page
  const [selectedClass, setSelectedClass] = useState("");

  const addClass = (entry) => {
    if (classes.indexOf(entry) === -1) setClasses([...classes, entry]);
  };

  const deleteClass = (entry) => {
    const index = classes.indexOf(entry);
    const newClasses = [...classes];
    if (index !== -1) {
      newClasses.splice(index, 1);
      setClasses(newClasses);
    }
  };

  const handleEditProfile = async () => {
    const res = await editProfile(
      uid,
      firstName,
      lastName,
      email,
      editMajor,
      editYear,
      classes
    );
    if (res.error) {
      window.alert(res.errMsg);
    } else {
      // TO DO, change the states of the user
    }
  };

  return (
    <PageFrame onTitleClick={() => history.push("/search/")}>
      <Frame>
        <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20 }}>
          Profile
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
          placeholder="Major"
          value={editMajor}
          type={"major"}
          autoComplete="on"
          onInput={(e) => setEditMajor(e.target.value)}
        />
        <AppTextInput
          placeholder="Year"
          value={editYear}
          type={"year"}
          onInput={(e) => setEditYear(e.target.value)}
        />
        <Text>Classes</Text>
        <AppDropDown
          onSelect={addClass}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        ></AppDropDown>
        {/* <AppDropDown onSelect={addClass}></AppDropDown> */}
        <Frame style={{ flexDirection: "row" }}>
          {classes.map((entry, index) => (
            <Course
              key={index}
              courseName={entry}
              onClick={() => deleteClass(entry)}
            />
          ))}
        </Frame>
        <AppButton onClick={handleEditProfile}>Save Changes</AppButton>
      </Frame>
    </PageFrame>
  );
};
export default EditProfilePage;
