import React from "react";
import Card from "react-bootstrap/Card";

export default class Movie extends React.Component {
  render() {
    return (
      <>
        {this.props.movies.data &&
          this.props.movies.data.map((movie, idx) => (
            <Card key={idx} className="card" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={movie.img_url} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {movie.overview} <br></br>
                  Popularity: {movie.popularity}
                  <br></br>
                  Release date: {movie.released}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </>
    );
  }
}
