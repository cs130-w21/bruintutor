import styles from "./styles.jsx";

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

const ImageUploader = ({
  frameStyle,
  imageUrl,
  setImageUrl,
  radius,
  uploadable,
}) => {
  return (
    <div style={{ ...styles.frame, ...frameStyle }}>
      <div
        style={{
          ...styles.fileSelector,
          width: 2 * radius,
          height: 2 * radius,
        }}
      >
        {imageUrl ? (
          <img alt={"no preview"} src={imageUrl} style={styles.previewImage} />
        ) : (
          <div style={styles.previewImage}></div>
        )}
        {uploadable ? (
          <input
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            onChange={async (e) => {
              if (e.target.files.length > 0)
                setImageUrl(await blobToBase64(e.target.files[0]));
            }}
            type="file"
            id="img"
            name="img"
            accept=".jpg, .png, .svg"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
