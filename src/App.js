import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount = () => {
    console.log("App Component Run")
  }

  render() {
      return (
        <div className="centerColumn">
          <div className="centerColumn navBar">
          <p style={{fontSize: "2.5vh"}}>
            {this.props.mapData}
          </p>
          <p style={{fontSize: "2vh"}}>
            Lakeland - Tyger | Next | This | That
          </p>
          </div>
          <div className="mapContainer">
            <img src={`/maps/${this.props.mapName}.jpg`} alt={this.props.mapName}>
            </img>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    mapData: state.mapData,
    mapName: state.mapName
  })

export default connect(mapStateToProps,null)(App);
