import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

class Index extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Search />
                <Tracks />
            </React.Fragment>
        )
    }
}

export default Index;