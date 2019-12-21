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
    defaultYOffSet: 0,
    zoomXOffSet: 0,
    zoomYOffSet: 0,
    multiplyerX: 0,
    zoomCenterAmount: 0
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
        // defaultYOffSet: state.defaultYOffSet = newYTrim
      }))
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
      console.log(scaleMult,imgMult,width,finalScale)
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
        finalScaleArr.push(finalScale * (((i * 25) * 0.01)+1))
      }
    }

    this.setState((state, props) => ({
      imgWidth: state.imgWidth = width,
      imgHeight: state.imgHeight = height,
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffSet: state.defaultYOffSet = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset,
      zoomXOffSet: state.zoomXOffSet = xOffset,
      zoomYOffSet: state.zoomYOffSet = yOffset
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

    for (i = 0; i < 4; i++) {
      if (i === 0) {
        finalScaleArr.push(newScaleFinal)
      } else {
        finalScaleArr.push(newScaleFinal * (((i * 25) * 0.01)+1))
      }
    }

    this.setState((state, props) => ({
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffSet: state.defaultYOffSet = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset
    }))
  }

  handleZoomIn = () => {
    let zoom = document.getElementsByClassName("mapContainer")[0].childNodes[0]
    let zoomAmountY = ((this.state.imgHeight * this.state.defaultScaleArr[this.state.currZoom + 1]) - (this.state.imgWidth * this.state.defaultScaleArr[this.state.currZoom]))
    let zoomAmountX = ((this.state.imgWidth * this.state.defaultScaleArr[this.state.currZoom + 1]) - (this.state.imgWidth * this.state.defaultScaleArr[this.state.currZoom]))
    console.log(this.state.multiplyerX)
    if (this.state.currZoom !== 3) {
      zoom.style.transition = "0.3s"
      this.setState((state) => ({
        currZoom: state.currZoom = this.state.currZoom + 1,
        zoomXOffSet: state.zoomXOffSet = -zoomAmountX,
        zoomYOffSet: state.zoomYOffSet = -zoomAmountY + this.state.defaultYOffSet
      }))
    }
    setTimeout(() => {
      zoom.style.transition = null
    }, 150)
  }

  handleZoomOut = () => {
    let zoom = document.getElementsByClassName("mapContainer")[0].childNodes[0]
    if (this.state.currZoom !== 0) {
      zoom.style.transition = "0.3s"
      this.setState((state) => ({
        currZoom: state.currZoom = this.state.currZoom - 1,
        zoomYOffSet: state.zoomYOffSet = this.state.defaultYOffSet
      }))
    }
    setTimeout(() => {
      zoom.style.transition = null
    }, 150)
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
                                     translateY(${this.state.currZoom === 0 ? this.state.defaultYOffSet : this.state.zoomYOffSet}px)`}}
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
              <p style={{cursor: "pointer"}} onClick={this.handleZoomIn} > Increase </p>
              <p style={{cursor: "pointer"}} onClick={this.handleZoomOut} > Decrease </p>
            </div>
            <div className="zoomCenter">
              <p>X</p>
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
