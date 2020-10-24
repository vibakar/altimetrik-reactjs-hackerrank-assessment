import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      year: null,
      movies: [],
      noResult: false
    }
  }

  handleChange = (e) => {
    this.setState({year: e.target.value});
  }

  handleClick = () => {
    let url = `https://jsonmock.hackerrank.com/api/movies?Year=${this.state.year}`;
    fetch(url)
    .then(response => response.json())
    .then(resp => {
      if(resp.data.length > 0)
        this.setState({movies: resp.data, noResult: false});
      else
        this.setState({movies: [], noResult: true})
    })
    .catch(error => this.setState({movies: [], noResult: true}));
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input onChange={this.handleChange} type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input"/>
          <button onClick={this.handleClick} className="" data-testid="submit-button">Search</button>
        </section>
        {this.state.movies.length > 0 ? <p data-testid="app-title">Movie List</p> : ''}
        <ul className="mt-50 styled" data-testid="movieList">
          {this.state.movies.map(m => {
            return  <li key={m.imdbID} className="slide-up-fade-in py-10">{m['Title']}</li>
          })}
        </ul>

        {this.state.noResult ? <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div> : ''}
      </div>
    );
  }
}
