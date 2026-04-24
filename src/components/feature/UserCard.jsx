export const UserCard = ({firstname = "Umesh Rana", technology="Full Stack"}) => {  // object destructuring. default value.
  return (
    <div>
      <h2>User Name: { firstname }</h2>
      <p>Technology: { technology }</p>
    </div>
  )};

//   export const UserCard = ({firstname, technology}) => {  // object destructuring.
//   return (
//     <div>
//       <h2>User Name: { firstname }</h2>
//       <p>Technology: { technology }</p>
//     </div>
//   )};

// export const UserCard = (props) => {     // using props.
//   console.log(props);
//   return (
//     <div>
//       <h2>User Name: { props.firstname }</h2>
//       <p>Technology: { props.technology }</p>
//     </div>
//   );
// };