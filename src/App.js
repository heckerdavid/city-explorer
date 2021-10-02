import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Weather from "./Components/weather.js";
import Movie from "./Components/movie.js";
import Header from "./Components/header.js";
import Map from "./Components/map.js";
import Error from "./Components/error.js";

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
      const weatherURL = `https://city-explorer-api-david.herokuapp.com/weather?lat=${locationData.lat}&lon=${locationData.lon}&searchquery=${this.state.citySelection}`;

      const localResponse = await axios.get(weatherURL);

      const movieResponse = await axios.get(movieURL);

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
        <Header
          updateCitySelection={this.updateCitySelection}
          handleClick={this.handleClick}
        />

        {this.state.locationData.lat && <h1>{this.state.citySelection}</h1>}
        {this.state.locationData.lat && (
          <>
            <Map locationData={this.state.locationData} />

            <Weather localResponse={this.state.localResponse.data} />
            <Movie movies={this.state.movies} />
          </>
        )}
        {this.state.error && (
          <Error errorMessage={this.state.errorMessage} citySelection={this.state.citySelection} />

        )}
      </>
    );
  }
}
