import React from "react";
import Card from "react-bootstrap/Card";

export default class Error extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Error</Card.Title>
            <Card.Text>
              {this.props.errorMessage + this.props.citySelection}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
