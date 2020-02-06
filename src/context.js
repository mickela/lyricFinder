import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        track_list: [], 
        heading: "UK Top 20 tracks"
    }

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=uk&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            this.setState(()=>({ track_list: res.data.message.body.track_list }))
            // console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;