import React from 'react';
import { MovieProvider } from '../services/MovieProvider';
import { Link } from 'react-router-dom';

export class MovieComponent extends React.Component {
    movieProvider;

    constructor(props) {
        super(props);
        this.state = {};
        this.movieProvider = new MovieProvider();
    }

    getMovieDetails() {
        this.props.match.params.movieId
            && this.movieProvider.getMovieDetails(this.props.match.params.movieId)
                .then(response => { this.setState({ movie: response.data }); })
                .catch(error => console.log(error));
    }

    render() {
        if (!this.state.movie) {
            this.getMovieDetails();
        }

        const { movie = {} } = this.state;

        return <div className='custom_bg'>
            <div className='single_column'>
                <div className='poster'>
                    <div className='image_content'>
                        Here will be image
                        </div>
                    <div>
                        {movie.original_title}
                    </div>
                    <div>
                        Popularity: {movie.popularity}
                    </div>
                </div>
                <div className='header_poster_wrapper'>
                    <div className='header_info'>
                        <h3>Overview</h3>
                        <div className='overview'>
                            <p>{movie.overview}</p>
                            <p>Release data: {movie.release_date}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to='/'>Back to popular movies</Link>
                </div>
            </div>
        </div>;
    }
}