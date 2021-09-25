import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Weather from "./Components/weather.js";
import Movie from './Components/movie.js';
import Header from './Components/header.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySelection: "",
      locationData: {},
      error: false,
      movies: [],
    };
  }

  handleClick = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LIQ_KEY}&q=${this.state.citySelection}&format=json`;
    const movieURL = `https://city-explorer-api-david.herokuapp.com/movies?searchQuery=${this.state.citySelection}`;
    // const movieURL = `http://localhost:3001/movies?searchQuery=${this.state.citySelection}`;
    
    try {
      const response = await axios.get(url);
      const locationData = response.data[0];
      // const weatherURL = `http://localhost:3001/weather?lat=${locationData.lat}&lon=${locationData.lon}&searchquery=${this.state.citySelection}`;
      const weatherURL = `https://city-explorer-api-david.herokuapp.com/weather?lat=${locationData.lat}&lon=${locationData.lon}&searchquery=${this.state.citySelection}`

      const localResponse = await axios.get(weatherURL);
      console.log(localResponse.data);

      const movieResponse = await axios.get(movieURL);
      console.log(movieResponse);

      this.setState({
        locationData: locationData,
        error: false,
        localResponse: localResponse,
        movies: movieResponse,
      });
    } catch (error) {
      this.setState({
        locationData: "",
        error: true,
        errorMessage: `${error}. Unable to locate `,
      });
    }
  };

  updateCitySelection = (event) => {
    this.setState({ citySelection: event.target.value });
  };

  render() {
    return (
      <>
        <Header updateCitySelection={this.updateCitySelection} handleClick={this.handleClick} />
 
        {this.state.locationData.lat && <h1>{this.state.citySelection}</h1>}
        {this.state.locationData.lat && (
          <>
            <Card className="mapcard" bg='dark' style={{ width: "28rem" }}>
              <Card.Img
                variant="top"
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LIQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=12`}
              />
              <Card.Body>
                <Card.Title>{this.state.locationData.display_name}</Card.Title>
                <Card.Text>
                  Latitude: {this.state.locationData.lat} <br></br>
                  Longitude: {this.state.locationData.lon}
                </Card.Text>
              </Card.Body>
            </Card>
            <Weather localResponse={this.state.localResponse.data} />
            <Movie movies={this.state.movies} />
          </>
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
