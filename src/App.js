import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      citySelection: '',
      locationData: {},
      error: false
    }
  }

  handleClick = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LIQ_KEY}&q=${this.state.citySelection}&format=json`;

    const response = await axios.get(url);

    const locationData = response.data[0];

    this.setState({
      locationData: locationData,
      error: false,
    })
  }

  updateCitySelection = (event) => {
    this.setState({citySelection: event.target.value})
  }

  render() {
    return (
      <>
        <input
          onChange={this.updateCitySelection}
          placeholder="Find a city"
        ></input>
        <Button onClick={this.handleClick} variant="dark">
          Explore!
        </Button>
        {this.state.citySelection && <h1>{this.state.citySelection}</h1>}
        {this.state.locationData.lat && (
          <Card class='card' style={{ width: "18rem" }}>
            <Card.Img variant="top" src={
              `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LIQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`} />
            <Card.Body>
              <Card.Title>{this.state.locationData.display_name}</Card.Title>
              <Card.Text>
                <p>Latitude: {this.state.locationData.lat}</p>
                <p>Longitude: {this.state.locationData.lon}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}
