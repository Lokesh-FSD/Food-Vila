import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor() {
    super();
    console.log("Parent Contructor is called");
  }

  componentDidMount() {
    console.log("Parent ComponetDidMount is called");
  }

  render() {
    console.log("Parent render will be called");
    return (
      <div>
        <UserClass name={"first "} location={"Bengaluru"} />
      </div>
    );
  }
}

export default About;
