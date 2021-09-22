import React from "react";

export default class Weather extends React.Component {
  render() {
    return (
      <h1>${this.props.localResponse}</h1>
    )
  }
}