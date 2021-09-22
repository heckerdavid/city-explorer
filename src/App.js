import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Weather from "./Components/weather";

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
    
    try {
      const response = await axios.get(url);
      const locationData = response.data[0];
      
      const localURL = `http://localhost:3001/weather?lat=${locationData.lat}&lon=${locationData.lon}&searchquery=${this.state.citySelection}`;
      const localResponse = await axios.get(localURL);
      console.log(typeof(localResponse.data))
  
      this.setState({
        locationData: locationData,
        error: false,
        localResponse: localResponse.data,
      })

    } catch (error) {
      this.setState({
        locationData: '',
        error: true,
        errorMessage: `${error}. Unable to locate `,
      })

    }


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
        {this.state.locationData.lat && <h1>{this.state.citySelection}</h1>}
        {this.state.locationData.lat && (
          <Card class="card" style={{ width: "28rem" }}>
            <Card.Img
              variant="top"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LIQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`}
            />
            <Card.Body>
              <Card.Title>{this.state.locationData.display_name}</Card.Title>
              <Card.Text>
                Latitude: {this.state.locationData.lat} <br></br>
                Longitude: {this.state.locationData.lon}
                <Weather localResponse={this.state.localResponse} />
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {this.state.error && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Error</Card.Title>
              <Card.Text>
               {this.state.errorMessage + this.state.citySelection}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}
