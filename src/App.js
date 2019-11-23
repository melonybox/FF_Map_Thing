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
          <p className="titleText">
            {this.props.mapData}
          </p>
          <p className="navText">
            Lakeland - Tyger | Next | This | That
          </p>
          </div>
          <div className="mapContainer">
            <img src={`/maps/${this.props.mapName}.jpg`} alt={this.props.mapName} usemap="#image-map">
            </img>
            <map name="image-map">
              <area style={{cursor: "pointer"}} alt="a" title="a" coords="947,450,922,425" shape="rect" />
            </map>
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
