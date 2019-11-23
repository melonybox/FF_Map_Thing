import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  state = {
    click: false
  }

  componentDidMount = () => {
    console.log("App Component Run")
  }

  handleClickDown = (e) => {
    e.preventDefault()
    this.setState(() => ({
      click: true
    }))
    console.log(e.clientX,e.clientY)
  }

  handleClickUp = (e) => {
    console.log(e.clientX,e.clientY)
    this.setState(() => ({
      click: false
    }))
  }

  handleMouseMove = (e) => {
    if (this.state.click === true) {
      console.log(e.clientX,e.clientY)
    }
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
            <img src={`/maps/${this.props.mapName}.jpg`} alt={this.props.mapName} useMap="#image-map" onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onMouseMove={this.handleMouseMove}>
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
