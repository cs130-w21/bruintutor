import Frame from "../Frame";
import ImageUploader from "../ImageUploader";
import styles from "./styles.jsx";

const ProfilePicture = ({ radius, url, setUrl, editable }) => {
  return (
    <ImageUploader
      imageUrl={url}
      setImageUrl={setUrl}
      radius={radius}
      uploadable={editable}
    />
  );
};

export default ProfilePicture;
