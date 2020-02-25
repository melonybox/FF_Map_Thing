import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap,getMapNamesFetch} from './actions/actions.js';
import MapBox from './containers/mapBox.js'
import NavBarBox from './containers/navBarBox.js'


class App extends Component {

  componentDidMount = () => {
    this.props.getMapNamesFetch()

    // this.loadJSON((json) => {
    //   this.props.getMapNamesFetch(json)
    // })
  }

  // loadJSON = (callback) => {
  //   var xobj = new XMLHttpRequest();
  //   xobj.overrideMimeType("application/json");
  //   xobj.open('GET', '../json/maps.json', true);
  //   xobj.onreadystatechange = () => {
  //     if (xobj.readyState === 4 && xobj.status === 200) {
  //       // Required use of an anonymous callback as .open
  //       // will NOT return a value but simply returns undefined
  //       // in asynchronous mode
  //       callback(JSON.parse(xobj.response));
  //     }
  //   };
  //   xobj.send(null);
  // }

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
