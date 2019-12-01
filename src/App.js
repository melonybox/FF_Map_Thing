import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  state = {
    click: false,
    imgWidth: 0,
    imgHeight: 0,
    defaultScaleArr: [],
    currZoom: 0,
    defaultXOffSet: 0,
    defaultYOffset: 0
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
    let widthScale = e.target.parentElement.clientWidth / width
    let heightScale = e.target.parentElement.clientHeight / height
    let finalScale = 0
    let xOffset = 0
    let yOffset = 0

    if (height * widthScale > e.target.parentElement.clientHeight) {
      finalScale = heightScale
      xOffset = ((e.target.parentElement.clientWidth - (finalScale * width)) / 2) + (e.target.parentElement.clientWidth - (finalScale * width))
    } else {
      finalScale = widthScale
      yOffset = e.target.parentElement.clientHeight
    }

    let finalScaleArr = []
    let i = 0

    for (i = 4; i > 0; i--) {
      if (i === 4) {
        finalScaleArr.push(finalScale)
      } else {
        finalScaleArr.push(finalScale * (i * 0.25))
      }
    }

    console.log(finalScaleArr)

    this.setState((state, props) => ({
      imgWidth: state.imgWidth = width,
      imgHeight: state.imgHeight = height,
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffset: state.defaultYOffset = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset
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

    let finalScaleArr = []
    let i = 0

    for (i = 4; i > 0; i--) {
      if (i === 4) {
        finalScaleArr.push(newScaleFinal)
      } else {
        finalScaleArr.push(newScaleFinal * (i * 0.25))
      }
    }

    console.log(finalScaleArr)

    this.setState((state, props) => ({
      defaultScaleArr: state.defaultScaleArr = finalScaleArr
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
            <img src={`/maps/${this.props.mapName}.jpg`} onLoad={this.handleLoad} style={{transform: `scale(${this.state.defaultScaleArr[this.state.currZoom]}) translateX(${this.state.defaultXOffSet}px) translateY(${this.state.defaultYOffset}px)`}}alt={this.props.mapName} useMap="#image-map" onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onMouseMove={this.handleMouseMove}>
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
