import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }
    onChange = e =>{
        let newvalue = e.target.value;
        this.setState(()=>({ trackTitle: newvalue }))
        // this.setState({ [e.target.name]: e.target.value }) <- this is how brad did it 😆
    }
    onClick = (dispatch, country, e) =>{
        e.preventDefault();
        // console.log(country)
        dispatch({
            type: 'LOADING',
            payload: []
        });
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=${country}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            // console.log(res.data)
            let heading = '';
            if(country === 'uk'){
                heading = 'UK Top 20 tracks';
            }else if(country === 'fr'){
                heading = 'France Top 20 tracks';
            }else if(country === 'ng'){
                heading = 'Nigeria Top 20 tracks';
            }else if(country === 'it'){
                heading = 'Italy Top 20 tracks';
            }else if(country === 'us'){
                heading = 'US Top 20 tracks';
            }
            dispatch({
                type: 'CHANGE_REGION',
                payload: res.data.message.body.track_list,
                heading: heading
            });

            this.setState(()=>({ trackTitle: '' }));
        })
        .catch(err => console.log(err))
    }
    findTrack = (dispatch, e) =>{
        e.preventDefault();
        dispatch({
            type: 'LOADING',
            payload: []
        });
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState(()=>({ trackTitle: '' }));
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <Consumer>
                {value =>{
                    const { dispatch } = value;
                    // console.log(value)
                    return(
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center text-capitalize">
                                <i className="fas fa-music"/> Search for a song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" value={this.state.trackTitle} onChange={this.onChange} placeholder="song title..." className="form-control form-control-lg" name="trackTitle" />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
                            </form>
                            <div className="text-center">
                                <p className="text-muted">Get top tracks from: 
                                    <button className="btn btn-sm btn-info mx-3" onClick={this.onClick.bind(this, dispatch, 'fr')}>France</button>
                                    <button className="btn btn-sm btn-info mx-3" onClick={this.onClick.bind(this, dispatch, 'uk')}>Uk</button>
                                    <button className="btn btn-sm btn-info mx-3" onClick={this.onClick.bind(this, dispatch, 'ng')}>Nigeria</button>
                                    <button className="btn btn-sm btn-info mx-3" onClick={this.onClick.bind(this, dispatch, 'us')}>US</button>
                                    <button className="btn btn-sm btn-info mx-3" onClick={this.onClick.bind(this, dispatch, 'it')}>Italy</button>
                                </p>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search;
