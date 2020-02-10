import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap,getMapNamesFetch} from './actions/actions.js';
import MapBox from './containers/mapBox.js'
import NavBarButton from './components/navBarButton.js'


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
              <button className="navText" type="button" onClick={() => this.handleMap(0)}>Tarchia</button>
              <button className="navText" type="button" onClick={() => this.handleMap(1)}>Aglaope</button>
              <NavBarButton />
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
