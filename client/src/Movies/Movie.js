import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.props.setCurrentMovie(res.data))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.props.currentMovie);
  };

  removeMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then(() => {
      this.props.history.replace("/")
    })
    .catch(err => {
      alert(err.message)
    })
  }

  render() {
    if (!this.props.currentMovie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.props.currentMovie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link className="edit-button" to={`/update-movie/${this.props.currentMovie.id}`}>
          <div >
            Edit
          </div>
        </Link>
          <div className="delete-button" onClick={this.removeMovie}>
            Delete
          </div>
      </div>
    );
  }
}
