import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HideableText from './hideable_text';
import AutoCompleteText from './AutoCompleteText';
import countries from './countries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React ppl</h1>
        </header>
        <div className="App-content">
          <HideableText text="Round " />
          <AutoCompleteText items={countries} />
        </div>
      </div>
    );
  }
}

export default App;
