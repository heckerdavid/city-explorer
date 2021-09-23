import React from "react";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.localResponse[0].date && this.props.localResponse.map((city, idx) => (<h3 key={idx}>{city.date}<br></br>{city.description}</h3>))}
      </>
    );
  }
}
