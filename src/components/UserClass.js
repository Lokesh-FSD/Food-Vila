import React from "react";
import { Component } from "react";

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "usreMame",
        location: "default",
      },
    };

    console.log("Child Constructor is Called");
  }

  async componentDidMount() {
    console.log("child ComonentDidMount is called");

    // APi Call
    const data = await fetch("https://api.github.com/users/Lokesh-FSD");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    this.timer = setInterval(() => {
      console.log("timer is called");
    }, 1000);
  }

  componentDidUpdate() {
    console.log("componet Did Update");
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("Component Will Unmount");
  }

  render() {
    console.log("Child Render is Called");

    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div>
        <div className="user-card ">
          <img src={avatar_url} />
          <h2>Name : {name}</h2>
          <h2>Location : {location}</h2>
        </div>
      </div>
    );
  }
}

export default UserClass;
