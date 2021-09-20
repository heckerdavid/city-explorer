import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      citySelection: '',
      location: {},
      error: false
    }
  }

  handleClick = () => console.log(this.state.location)

  updateCitySelection = (event) => {
    this.setState({citySelection: event.target.value})
    console.log("city selected is " + this.state.citySelection)
  }
  render() {
    return (
      <>
        <input onChange={this.updateCitySelection} placeholder="Find a city"></input>
        <Button onClick={this.handleClick} variant="dark">Explore!</Button>
        {this.state.citySelection && <h1>{this.state.citySelection}</h1>}
      </>
    );
  }
}
