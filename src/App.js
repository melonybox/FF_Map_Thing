import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap} from './actions/actions.js';
import MapBox from './containers/mapBox.js'


class App extends Component {

  handleMap = (page) => {
    this.props.handleMap(1)
  }

  render() {
      return (
        <div className="centerColumn">
          <div className="centerColumn navBar">
            <h1 className="titleText">
              {this.props.mapData}
            </h1>
            <p className="navText" onClick={this.handleMap}>
              Lakeland - Tyger | Next | This | That
            </p>
          </div>
          <MapBox />
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    mapData: state.mapData,
    mapName: state.mapName,
    mapSelect: state.mapSelect
  })

  const mapDispatchToProps = dispatch => ({
    handleMap: (page) => dispatch(handleMap(page))
  })

export default connect(mapStateToProps,mapDispatchToProps)(App);
