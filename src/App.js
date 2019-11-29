import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  state = {
    click: false,
    imgWidth: 0,
    imgHeight: 0,
    defaultScale: 0
  }

  componentDidMount = () => {
    console.log("App Component Run")
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleClickDown = (e) => {
    e.preventDefault()
    this.setState((state) => ({
      click: state.click = true
    }))
    console.log(this.state)
  }

  handleClickUp = (e) => {
    this.setState((state) => ({
      click: state.click = false
    }))
    console.log(this.state)
  }

  handleMouseMove = (e) => {
    if (this.state.click === true) {
      console.log(e.clientX,e.clientY)
    }
  }

  handleLoad = (e) => {
    let width = e.target.width
    let height = e.target.height
    let widthScale = e.target.parentElement.clientWidth / e.target.width
    let heightScale = e.target.parentElement.clientHeight / e.target.height
    let finalScale = 0

    if (height * widthScale > e.target.parentElement.clientHeight) {
      finalScale = heightScale
    } else {
      finalScale = widthScale
    }

    this.setState((state, props) => ({
      imgWidth: state.imgWidth = width,
      imgHeight: state.imgHeight = height,
      defaultScale: state.defaultScale = finalScale
    }))
  }

  updateWindowDimensions = () => {
    let newScaleHeight = document.getElementsByClassName("mapContainer")[0].clientHeight / this.state.imgHeight
    let newScaleWidth = document.getElementsByClassName("mapContainer")[0].clientWidth / this.state.imgWidth
    let newScaleFinal = 0

    if (this.state.imgHeight * newScaleWidth > document.getElementsByClassName("mapContainer")[0].clientHeight) {
      newScaleFinal = newScaleHeight
    } else {
      newScaleFinal = newScaleWidth
    }

    this.setState((state, props) => ({
      defaultScale: state.defaultScale = newScaleFinal
    }))
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
            <img src={`/maps/${this.props.mapName}.jpg`} onLoad={this.handleLoad} style={{transform: `scale(${this.state.defaultScale}) translateX(0px) translateY(0px)`}}alt={this.props.mapName} useMap="#image-map" onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onMouseMove={this.handleMouseMove}>
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
