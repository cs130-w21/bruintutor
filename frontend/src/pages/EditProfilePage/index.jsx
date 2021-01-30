import Frame from "../../components/Frame";
import PageFrame from "../../components/PageFrame";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import Text from "../../components/Text";
import AppDropDown from "../../components/DropDown";
import { editProfile } from "../../api";
import { useState } from "react";

const EditProfilePage = () => {
  // defined useState for the fields in the edit profile page
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMajor, setEditMajor] = useState("");
  const [editYear, setEditYear] = useState("");
  const [classes, setClasses] = useState([]);

  const handleEditProfile = async () => {
    const res = await editProfile(
      firstName,
      lastName,
      email,
      editMajor,
      editYear,
      classes
    );
    if (res.error) {
      // TO DO, notify the failure
    } else {
      // TO DO, change the states of the user
    }
  };

  return (
    <PageFrame>
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
        <AppDropDown></AppDropDown>

        <AppButton onClick={handleEditProfile}>Save Changes</AppButton>
      </Frame>
    </PageFrame>
  );
};
export default EditProfilePage;
