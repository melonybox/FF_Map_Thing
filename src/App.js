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
    defaultYOffset: 0,
    zoomXOffSet: 0,
    zoomYOffSet: 0,
    multiplyerX: 0
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
    if (this.state.currZoom !== 0) {
      this.setState((state) => ({
        click: state.click = true
      }))
      console.log(this.state)
    }
  }

  handleClickUp = (e) => {
    this.setState((state) => ({
      click: state.click = false
    }))
  }

  handleMouseMove = (e) => {
    if (this.state.click === true) {
      let newXTrim = this.state.zoomXOffSet + (e.movementX/this.state.defaultScaleArr[this.state.currZoom])
      let newYTrim = this.state.zoomYOffSet + (e.movementY/this.state.defaultScaleArr[this.state.currZoom])
      this.setState((state, props) =>({
        zoomXOffSet: state.zoomXOffSet = newXTrim,
        zoomYOffSet: state.zoomYOffSet = newYTrim
        // defaultXOffSet: state.defaultXOffSet = newXTrim,
        // defaultYOffset: state.defaultYOffset = newYTrim
      }))
      console.log(newYTrim)
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
      let scaleMult = e.target.parentElement.clientWidth / (width * finalScale)
      let imgMult = width * scaleMult
      xOffset = (imgMult - width) / 2
      this.setState((state, props) => ({
        multiplyerX: state.multiplyerX = scaleMult
      }))
    } else {
      finalScale = widthScale
      let scaleMult = e.target.parentElement.clientHeight / (height * finalScale)
      let imgMult = height * scaleMult
      yOffset = (imgMult - height) / 2
      this.setState((state, props) => ({
        multiplyerX: state.multiplyerX = scaleMult
      }))
    }

    let finalScaleArr = []
    let i = 0

    for (i = 0; i < 4; i++) {
      if (i === 0) {
        finalScaleArr.push(finalScale)
      } else {
        finalScaleArr.push(finalScale * (i * 1.25))
      }
    }

    this.setState((state, props) => ({
      imgWidth: state.imgWidth = width,
      imgHeight: state.imgHeight = height,
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffset: state.defaultYOffset = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset,
      zoomXOffSet: state.defaultXOffSet = xOffset,
      zoomYOffSet: state.defaultYOffset = yOffset
    }))
  }

  updateWindowDimensions = () => {
    let newScaleHeight = document.getElementsByClassName("mapContainer")[0].clientHeight / this.state.imgHeight
    let newScaleWidth = document.getElementsByClassName("mapContainer")[0].clientWidth / this.state.imgWidth
    let newScaleFinal = 0
    let xOffset = 0
    let yOffset = 0

    if (this.state.imgHeight * newScaleWidth > document.getElementsByClassName("mapContainer")[0].clientHeight) {
      newScaleFinal = newScaleHeight
      let scaleMult = document.getElementsByClassName("mapContainer")[0].clientWidth / (this.state.imgWidth * newScaleFinal)
      let imgMult = this.state.imgWidth * scaleMult
      xOffset = (imgMult - this.state.imgWidth) / 2
      yOffset = 0
      this.setState((state, props) => ({
        multiplyerX: state.multiplyerX = scaleMult
      }))
    } else {
      newScaleFinal = newScaleWidth
      let scaleMult = document.getElementsByClassName("mapContainer")[0].clientHeight / (this.state.imgHeight * newScaleFinal)
      let imgMult = this.state.imgHeight * scaleMult
      yOffset = (imgMult - this.state.imgHeight) / 2
      xOffset = 0
      this.setState((state, props) => ({
        multiplyerX: state.multiplyerX = scaleMult
      }))
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

    this.setState((state, props) => ({
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffset: state.defaultYOffset = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset
    }))
  }

  handleZoomIn = () => {
    if (this.state.currZoom !== 3) {
      this.setState((state) => ({
        currZoom: state.currZoom = this.state.currZoom + 1
      }))
    }
  }

  handleZoomOut = () => {
      if (this.state.currZoom !== 0) {
        this.setState((state) => ({
          currZoom: state.currZoom = this.state.currZoom - 1
        }))
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
            <img src={`/maps/${this.props.mapName}.jpg`}
                 onLoad={this.handleLoad}
                 style={{transform: `scale(${this.state.defaultScaleArr[this.state.currZoom]})
                                     translateX(${this.state.currZoom === 0 ? this.state.defaultXOffSet : this.state.zoomXOffSet}px)
                                     translateY(${this.state.currZoom === 0 ? this.state.defaultYOffset : this.state.zoomYOffSet}px)`}}
                 alt={this.props.mapName}
                 useMap="#image-map"
                 onMouseDown={this.handleClickDown}
                 onMouseUp={this.handleClickUp}
                 onMouseMove={this.handleMouseMove}>
            </img>
            <map name="image-map">
              <area style={{cursor: "pointer"}} alt="a" title="a" coords="947,450,922,425" shape="rect" />
            </map>
            <div className="zoomButtons">
              <p onClick={this.handleZoomIn} > Increase </p>
              <p onClick={this.handleZoomOut} > Decrease </p>
            </div>
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
