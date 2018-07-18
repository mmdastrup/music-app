import React, { Component } from "react";
import "./App.css";

let defaultStyle = {
  color: "#fff"
};
let fakeServerData = {
  user: {
    name: "Mike",
    playlists: [
      {
        name: "My favorites",
        songs: [
          { name: "Beat It", duration: 1345 },
          { name: "Cannelloni Makaroni", duration: 1236 },
          { name: "Rosa helikopter", duration: 70000 }
        ]
      },
      {
        name: "Top Hits",
        songs: [
          { name: "Yellow Submarine", duration: 1345 },
          { name: "God's Plan", duration: 1236 },
          { name: "One Foot", duration: 70000 }
        ]
      },
      {
        name: "Another playlist- the best!",
        songs: [
          { name: "Paranoid", duration: 135 },
          { name: "Starboy", duration: 136 },
          { name: "Bounce Back", duration: 700 }
        ]
      },
      {
        name: "Playlist - yeah!",
        songs: [
          { name: "Hej Hej Monika", duration: 135 },
          { name: "HUMBLE", duration: 123 },
          { name: "I want it that way", duration: 700 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{ defaultStyle }}>
        <img />
        <input type="text" />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, width: "25%", display: "inline-block" }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
} 

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {} };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000);
  }
  render() {
    
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, "font-size": "54px" }}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter />
            {this.state.serverData.user.playlists.map(playlist =>
               <Playlist playlist={playlist} /> 
            )}
          </div>
        ) : (
          <h1 style={{ ...defaultStyle }}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
