import React from "react";
import Button from "react-bootstrap/Button";

export default class Header extends React.Component {
  render() {
    return (
      <>
        <input
          onChange={this.props.updateCitySelection}
          placeholder="Search For A City..."
        ></input>
        <Button onClick={this.props.handleClick} variant="dark">
          Explore!
        </Button>
      </>
    );
  }
}
