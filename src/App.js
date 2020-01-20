import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap} from './actions/actions.js';
import MapBox from './containers/mapBox.js'


class App extends Component {

  handleMap = (page) => {
    this.props.handleMap(page)
  }

  render() {
      return (
        <div className="centerColumn">
          <div className="centerColumn navBar">
            <h1 className="titleText">
              {this.props.mapData}
            </h1>
            <div>
              <button className="navText" type="button" onClick={() => this.handleMap(0)}>Tarchia</button>
              <button className="navText" type="button" onClick={() => this.handleMap(1)}>Aglaope</button>
            </div>
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
