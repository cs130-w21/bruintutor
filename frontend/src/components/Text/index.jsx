const Text = ({ children, style, onClick }) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "roboto",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Text;
