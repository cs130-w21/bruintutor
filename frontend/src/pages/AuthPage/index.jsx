import Frame from "../../components/Frame";
import TextInput from "../../components/TextInput";
import TouchableOpacity from "../../components/TouchableOpacity";
const AuthPage = () => {
  return (
    <Frame
      extraStyle={{
        backgroundColor: "#EEEEEE",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Frame
        extraStyle={{
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
        <TouchableOpacity>
          <div>Sign In</div>
        </TouchableOpacity>
      </Frame>
    </Frame>
  );
};
export default AuthPage;
