// Functional Componet
import { useState } from "react";

const User = ({ name }) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <h3>Location : Maihar</h3>
      <h3>Contact : lokesh@gmail.com</h3>

      <h2>count : {count}</h2>
      <h2>count2 : {count2}</h2>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </div>
  );
};

export default User;
