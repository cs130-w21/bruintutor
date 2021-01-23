const Text = ({ children, style }) => {
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
    >
      {children}
    </div>
  );
};

export default Text;
