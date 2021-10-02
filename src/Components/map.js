import React from "react";
import Card from "react-bootstrap/Card";

export default class Map extends React.Component {
  render() {
    return (
      <>
        <Card className="mapcard" bg="dark" style={{ width: "28rem" }}>
          <Card.Img
            variant="top"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LIQ_KEY}&center=${this.props.locationData.lat},${this.props.locationData.lon}&zoom=12`}
          />
          <Card.Body>
            <Card.Title>{this.props.locationData.display_name}</Card.Title>
            <Card.Text>
              Latitude: {this.props.locationData.lat} <br></br>
              Longitude: {this.props.locationData.lon}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
