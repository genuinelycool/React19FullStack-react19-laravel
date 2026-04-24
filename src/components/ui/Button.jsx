export const Button = ({ label = "Click Me", clickHandle }) => {
  return (
    // <button onClick={() => alert('hello')}>{ label }</button>
    <button onClick={clickHandle}>{label}</button>
  );
};

// export const Button = ({label}) => {
//   return (
//     <button>{label || "Click Me"}</button>
//   );
// };
