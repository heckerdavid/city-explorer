import React from "react";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.localResponse[0].date && <h1>Local Weather</h1>}
        {this.props.localResponse[0].date &&
          this.props.localResponse.map((city, idx) => (
           <WeatherDay city={city} key={idx} />
          ))}
      </>
    );
  }
}

class WeatherDay extends React.Component {
  render() {
    return (
      <h3>
        {this.props.city.date}
        <br></br>
        {this.props.city.description}
      </h3>
    );
  }
}