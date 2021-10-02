import React from "react";
import Card from "react-bootstrap/Card";

export default class Movie extends React.Component {
  render() {
    return (
      <>
        {this.props.movies.data && <h1>Local Movies</h1>}

        {this.props.movies.data &&
          this.props.movies.data.map((movie, idx) => (
            <SingleMovie movie={movie} key={idx}/>
          ))}
      </>
    );
  }
}

class SingleMovie extends React.Component {

  render() {
    return (
      <>
        <Card
          border="dark"
          bg="dark"
          className="card"
          style={{ width: "12rem" }}
        >
          <Card.Img
            variant="top"
            src={"https://image.tmdb.org/t/p/w500" + this.props.movie.img_url}
          />
          <Card.Body>
            <Card.Title>{this.props.movie.title}</Card.Title>
            <Card.Text>
              {this.props.movie.overview} <br></br>
              Popularity: {this.props.movie.popularity}
              <br></br>
              Release date: {this.props.movie.released}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }

}