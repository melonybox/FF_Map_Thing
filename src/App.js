import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap,getMapNamesFetch} from './actions/actions.js';
import MapBox from './containers/mapBox.js'
import NavBarBox from './containers/navBarBox.js'


class App extends Component {

  componentDidMount = () => {
    this.props.getMapNamesFetch()
  }

  handleMap = (page) => {
    this.props.handleMap(page)
  }

  render() {
      return (
        this.props.mapNames.length === 0 ?
        <p className="zoomCenter">Loading...</p>
        :
        <div className="centerColumn">
          <div className="centerColumn navBar">
            <h1 className="titleText">
              {this.props.mapData}
            </h1>
            <div>
              <NavBarBox />
            </div>
          </div>
          <MapBox />
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    mapData: state.mapData,
    mapNames: state.mapNames,
    mapSelect: state.mapSelect
  })

  const mapDispatchToProps = dispatch => ({
    handleMap: (page) => dispatch(handleMap(page)),
    getMapNamesFetch: () => dispatch(getMapNamesFetch())
  })

export default connect(mapStateToProps,mapDispatchToProps)(App);
