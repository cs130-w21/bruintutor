const Line = ({ color }) => {
  return (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        border: "none",
        width: "60%",
        height: 1
      }}
    />
  );
};

export default Line;

