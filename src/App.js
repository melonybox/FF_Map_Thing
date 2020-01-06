import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleMap} from './actions/actions.js';
import MapBox from './containers/mapBox.js'


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
    zoomCenterAmount: 0,
    offsetZoomArr: {},
    boundingOffSetArr: {}
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

      if (newYTrim >= this.state.boundingOffSetArr[this.state.currZoom].yAxis) {
        newYTrim = this.state.boundingOffSetArr[this.state.currZoom].yAxis
      } else if (newYTrim <= 0) {
        newYTrim = 0
      }
      if (newXTrim <= this.state.boundingOffSetArr[this.state.currZoom].xAxis) {
        newXTrim = this.state.boundingOffSetArr[this.state.currZoom].xAxis
      } else if (newXTrim >= 0) {
        newXTrim = 0
      }
      this.setState((state, props) =>({
        zoomXOffSet: state.zoomXOffSet = newXTrim,
        zoomYOffSet: state.zoomYOffSet = newYTrim
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
    let natContYa = 0
    let natContXa = 0

    console.log(widthScale,heightScale)

    if (heightScale < widthScale) {
      finalScale = heightScale
      let scaleMult = e.target.parentElement.clientWidth / (width * finalScale)
      let imgMult = width * scaleMult
      xOffset = (imgMult - width) / 2
      natContYa = height
      natContXa = imgMult
    } else {
      finalScale = widthScale
      let scaleMult = e.target.parentElement.clientHeight / (height * finalScale)
      let imgMult = height * scaleMult
      yOffset = (imgMult - height) / 2
      natContYa = imgMult
      natContXa = width
    }

    let finalScaleArr = []
    let i = 0
    let offsetZoomArrTemp = {}
    let offsetZoomArr = {}
    let boundingOffSetArr = {}

    for (i = 0; i < 4; i++) {
      if (i === 0) {
        finalScaleArr.push(finalScale)
      } else {
        finalScaleArr.push(finalScale * (((i * 25) * 0.01)+1))
        let imgHeightCent = (height / 2)
        let imgWidthCent = (width / 2)
        let multFact = (((i  * 25) * 0.01) + 1)
        let contHeightCent = (natContYa / 2 )
        let contWidthCent = (natContXa / 2 )
        let zoomAmountY = yOffset + ((imgHeightCent * multFact) - contHeightCent) * (contHeightCent / (contHeightCent * multFact))
        let zoomAmountX = xOffset + ((imgWidthCent * multFact) - contWidthCent) * (contWidthCent / (contWidthCent * multFact))
        offsetZoomArrTemp[i] = {yAxis: zoomAmountY, xAxis: zoomAmountX}
        boundingOffSetArr[i] = {yAxis: -((zoomAmountY - yOffset)*2), xAxis: -((zoomAmountX - xOffset)*2)}
        if (i === 1) {
          offsetZoomArr[i] = {yAxis: offsetZoomArrTemp[i].yAxis ,xAxis: offsetZoomArrTemp[i].xAxis}
        } else if (i > 1) {
          offsetZoomArr[i] = {yAxis:(offsetZoomArrTemp[i].yAxis - offsetZoomArrTemp[i - 1].yAxis) ,xAxis: (offsetZoomArrTemp[i].xAxis - offsetZoomArrTemp[i - 1].xAxis)}
        }
      }
    }

    this.setState((state, props) => ({
      imgWidth: state.imgWidth = width,
      imgHeight: state.imgHeight = height,
      defaultScaleArr: state.defaultScaleArr = finalScaleArr,
      defaultYOffSet: state.defaultYOffSet = yOffset,
      defaultXOffSet: state.defaultXOffSet = xOffset,
      zoomXOffSet: state.zoomXOffSet = xOffset,
      zoomYOffSet: state.zoomYOffSet = yOffset,
      offsetZoomArr: state.offsetZoomArr = offsetZoomArr,
      boundingOffSetArr: state.boundingOffSetArr = boundingOffSetArr,
      currZoom: state.currZoom = 0
    }))

    console.log("Handle Load")
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
    } else {
      newScaleFinal = newScaleWidth
      let scaleMult = document.getElementsByClassName("mapContainer")[0].clientHeight / (this.state.imgHeight * newScaleFinal)
      let imgMult = this.state.imgHeight * scaleMult
      yOffset = (imgMult - this.state.imgHeight) / 2
      xOffset = 0
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

    if (this.state.currZoom !== 3) {
      zoom.style.transition = "0.3s"
      this.setState((state) => ({
        currZoom: state.currZoom = this.state.currZoom + 1,
        zoomXOffSet: state.zoomXOffSet = this.state.zoomXOffSet - this.state.offsetZoomArr[this.state.currZoom].xAxis,
        zoomYOffSet: state.zoomYOffSet = this.state.zoomYOffSet - this.state.offsetZoomArr[this.state.currZoom].yAxis
      }))
    }
    setTimeout(() => {
      zoom.style.transition = null
    }, 150)
  }

  handleZoomOut = () => {
    let zoom = document.getElementsByClassName("mapContainer")[0].childNodes[0]

    if (this.state.currZoom !== 0) {
      if (this.state.currZoom === 1) {
        zoom.style.transition = "0.3s"
        this.setState((state) => ({
          currZoom: state.currZoom = this.state.currZoom - 1,
          zoomXOffSet: state.zoomXOffSet = this.state.defaultXOffSet,
          zoomYOffSet: state.zoomYOffSet = this.state.defaultYOffSet
        }))
      } else if (this.state.currZoom > 1) {
        zoom.style.transition = "0.3s"
        this.setState((state) => ({
          currZoom: state.currZoom = this.state.currZoom - 1,
          zoomXOffSet: state.zoomXOffSet = this.state.zoomXOffSet + this.state.offsetZoomArr[this.state.currZoom + 1].xAxis,
          zoomYOffSet: state.zoomYOffSet = this.state.zoomYOffSet + this.state.offsetZoomArr[this.state.currZoom + 1].yAxis
        }))
      }
    }
    setTimeout(() => {
      zoom.style.transition = null
    }, 150)
  }

  handleMap = (page) => {
    this.props.handleMap(1)
  }

  render() {
      return (
        <div className="centerColumn">
          <div className="centerColumn navBar">
          <p className="titleText">
            {this.props.mapData}
          </p>
          <p className="navText" onClick={this.handleMap}>
            Lakeland - Tyger | Next | This | That
          </p>
          </div>
          <div className="mapContainer">
            <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}
                 onLoad={this.handleLoad}
                 style={{transform: `scale(${this.state.defaultScaleArr[this.state.currZoom]})
                                     translateX(${this.state.currZoom === 0 ? this.state.defaultXOffSet : this.state.zoomXOffSet}px)
                                     translateY(${this.state.currZoom === 0 ? this.state.defaultYOffSet : this.state.zoomYOffSet}px)`}}
                 alt={this.props.mapName}
                 useMap="#image-map"
                 onMouseDown={this.handleClickDown}
                 onMouseUp={this.handleClickUp}
                 onMouseMove={this.handleMouseMove}
                 onMouseLeave={this.handleClickUp}>
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
