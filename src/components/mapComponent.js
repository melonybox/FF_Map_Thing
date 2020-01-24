import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleMapData,
        handleZoomOffset,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove} from '../actions/actions';
import MapArea from '../components/mapArea.js'

class MapComponent extends Component {

  componentDidMount = () => {
    console.log("Resize Run")
    window.addEventListener('resize', this.handleLoad);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handeLoad);
  }

  handleLoad = (e) => {
    const mapImage = document.getElementById("mapImage")
    const mapCont = document.getElementById("mapCont")
    const imgWidth = mapImage.width
    const imgHeight = mapImage.height
    const imgContWidth = mapCont.clientWidth
    const imgContHeight = mapCont.clientHeight
    const widthScale = imgContWidth / imgWidth
    const heightScale = imgContHeight / imgHeight
    let defaultScale = 0
    let defaultXOffset = 0
    let defaultYOffset = 0
    let imgContX = 0
    let imgContY = 0
    let scaleMult = 0
    let imgContPixel = 0

    // (heightScale < widthScale)
    //simple ratio finder, if width is greater then center the width
    // scaleMult = imgContWidth / (imgWidth * defaultScale)
    //multiplyier needed to find image container width at image native resolution
    // imgContPixel = imgWidth * scaleMult
    //image container width in px at image native resolution

    if (heightScale < widthScale) {
      defaultScale = heightScale
      scaleMult = imgContWidth / (imgWidth * defaultScale)
      imgContPixel = imgWidth * scaleMult
      defaultXOffset = (imgContPixel - imgWidth) / 2
      imgContY = imgHeight
      imgContX = imgContPixel
    } else {
      defaultScale = widthScale
      scaleMult = imgContHeight / (imgHeight * defaultScale)
      imgContPixel = imgHeight * scaleMult
      defaultYOffset = (imgContPixel - imgHeight) / 2
      imgContY = imgContPixel
      imgContX = imgWidth
    }

    let mapZoomInfo = {}
    let offsetZoomArrTemp = {}

    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        mapZoomInfo[i] = {zoomScale: defaultScale}
      } else {
        mapZoomInfo[i] = {zoomScale: (defaultScale * (((i * 33) * 0.01) + 1))}
        const imgHeightCent = (imgHeight / 2)
        const imgWidthCent = (imgWidth / 2)
        const multFact = (((i  * 33) * 0.01) + 1)
        const contHeightCent = (imgContY / 2 )
        const contWidthCent = (imgContX / 2 )
        const zoomAmountY = defaultYOffset + ((imgHeightCent * multFact) - contHeightCent) * (contHeightCent / (contHeightCent * multFact))
        const zoomAmountX = defaultXOffset + ((imgWidthCent * multFact) - contWidthCent) * (contWidthCent / (contWidthCent * multFact))
        offsetZoomArrTemp[i] = {yAxis: zoomAmountY, xAxis: zoomAmountX}
        mapZoomInfo[i] = {...mapZoomInfo[i], boundsYAxis: -((zoomAmountY - defaultYOffset)*2), boundsXAxis: -((zoomAmountX - defaultXOffset)*2)}
        if (i === 1) {
          mapZoomInfo[i] = {...mapZoomInfo[i], zoomOffsetYAxis: offsetZoomArrTemp[i].yAxis ,zoomOffsetXAxis: offsetZoomArrTemp[i].xAxis}
        } else if (i > 1) {
          mapZoomInfo[i] = {...mapZoomInfo[i], zoomOffsetYAxis:(offsetZoomArrTemp[i].yAxis - offsetZoomArrTemp[i - 1].yAxis) ,zoomOffsetXAxis: (offsetZoomArrTemp[i].xAxis - offsetZoomArrTemp[i - 1].xAxis)}
        }
      }
    }

    let data = {}

    if (e.type === "load") {
      data = {mapZoomInfo: mapZoomInfo,
              defaultXOffset: defaultXOffset,
              defaultYOffset: defaultYOffset,
              zoomXOffset: defaultXOffset,
              zoomYOffset: defaultYOffset}
    } else {
      data = {mapZoomInfo: mapZoomInfo,
              defaultXOffset: defaultXOffset,
              defaultYOffset: defaultYOffset}
    }

    this.props.handleMapData(data)
  }

  handleZoomIn = () => {
    const zoom = document.getElementById("mapImage")

    if (this.props.currZoom !== 3) {
      zoom.style.transition = "0.2s"
      const currZoom = this.props.currZoom + 1
      const zoomXOffset = this.props.zoomXOffset - this.props.mapZoomInfo[currZoom].zoomOffsetXAxis
      const zoomYOffset = this.props.zoomYOffset - this.props.mapZoomInfo[currZoom].zoomOffsetYAxis
      const data = {currZoom: currZoom,
                    zoomXOffset: zoomXOffset,
                    zoomYOffset: zoomYOffset}
      this.props.handleZoomOffset(data)
      setTimeout(() => {
        zoom.style.transition = null
      }, 200)
    }
  }

  handleZoomOut = () => {
    const zoom = document.getElementById("mapImage")
    const currZoom = this.props.currZoom - 1
    let zoomXOffset = 0
    let zoomYOffset = 0
    let data = {}

    if (this.props.currZoom !== 0) {
      if (this.props.currZoom === 1) {
        zoom.style.transition = "0.2s"
        zoomXOffset = this.props.defaultXOffset
        zoomYOffset = this.props.defaultYOffset
        data = {currZoom: currZoom,
                zoomXOffset: zoomXOffset,
                zoomYOffset: zoomYOffset}
        this.props.handleZoomOffset(data)
        setTimeout(() => {
          zoom.style.transition = null
        }, 200)
      } else if (this.props.currZoom > 1) {
        zoom.style.transition = "0.2s"
        zoomXOffset = this.props.zoomXOffset + this.props.mapZoomInfo[currZoom + 1].zoomOffsetXAxis
        zoomYOffset = this.props.zoomYOffset + this.props.mapZoomInfo[currZoom + 1].zoomOffsetYAxis
        data = {currZoom: currZoom,
                zoomXOffset: zoomXOffset,
                zoomYOffset: zoomYOffset}
        this.props.handleZoomOffset(data)
        setTimeout(() => {
          zoom.style.transition = null
        }, 200)
      }
    }
  }

  handleMouseDown = (e) => {
    e.preventDefault()
    if (this.props.currZoom !== 0) {
      this.props.handleMouseDown()
    }
  }

  handleMouseUp = (e) => {
    if (this.props.currZoom !== 0 && this.props.click === true) {
      this.props.handleMouseUp()
    }
  }

  handleMouseMove = (e) => {
    if (this.props.click === true) {
      let data = {}
      let newXTrim = this.props.zoomXOffset + (e.movementX/this.props.mapZoomInfo[this.props.currZoom].zoomScale)
      let newYTrim = this.props.zoomYOffset + (e.movementY/this.props.mapZoomInfo[this.props.currZoom].zoomScale)

      if (this.props.mapZoomInfo[this.props.currZoom].boundsYAxis < 0) {
        if (newYTrim > 0 || newYTrim < this.props.mapZoomInfo[this.props.currZoom].boundsYAxis) {
          newYTrim = (newYTrim > 0) ? 0 : this.props.mapZoomInfo[this.props.currZoom].boundsYAxis
        }
      } else {
        if (newYTrim < 0 || newYTrim > this.props.mapZoomInfo[this.props.currZoom].boundsYAxis) {
          newYTrim = (newYTrim < 0) ? 0 : this.props.mapZoomInfo[this.props.currZoom].boundsYAxis
        }
      }

      if (this.props.mapZoomInfo[this.props.currZoom].boundsXAxis < 0) {
        if (newXTrim > 0 || newXTrim < this.props.mapZoomInfo[this.props.currZoom].boundsXAxis) {
          newXTrim = (newXTrim > 0) ? 0 : this.props.mapZoomInfo[this.props.currZoom].boundsXAxis
        }
      } else {
        if (newXTrim < 0 || newXTrim > this.props.mapZoomInfo[this.props.currZoom].boundsXAxis) {
          newXTrim = (newXTrim < 0) ? 0 : this.props.mapZoomInfo[this.props.currZoom].boundsXAxis
        }
      }

      data = {zoomXOffset: newXTrim,
              zoomYOffset: newYTrim}

      this.props.handleMouseMove(data)
    }
  }

  //css pointer-events: none to disable interaction of the mouse with buttons

  render(){
    return(
      this.props.mapLoaded === false ?
      <>
        <img src={`/maps/${this.props.mapNames[this.props.mapSelect]}.jpg`}
          onLoad={this.handleLoad}
          id="mapImage"
          alt={this.props.mapNames[this.props.mapSelect]}
          style={{display: "none"}}
          >
        </img>
        <p className="zoomCenter">Loading...</p>
      </>
      :
      <>
        <img src={`/maps/${this.props.mapNames[this.props.mapSelect]}.jpg`}
          onLoad={this.handleLoad}
          id="mapImage"
          alt={this.props.mapNames[this.props.mapSelect]}
          style={{transform: `scale(${this.props.mapZoomInfo[this.props.currZoom].zoomScale})
                              translateX(${this.props.currZoom === 0 ? this.props.defaultXOffset : this.props.zoomXOffset}px)
                              translateY(${this.props.currZoom === 0 ? this.props.defaultYOffset : this.props.zoomYOffset}px)`}}
          useMap="#image-map"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          >
        </img>
        <map name="image-map">
          <MapArea titleName="b" areaCoords="785,462, 16"/>
          {/* <area style={{cursor: "pointer"}} alt="a" title="a" coords="785,462, 16" shape="circle" /> */}
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="463,547, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="918,757, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="528,924, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="765,1151, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="910,1194, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="808,1531, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1380,564, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1497,637, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1390,962, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1627,1026, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1375,1249, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="945,1771, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1470,1711, 16" shape="circle" />
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="1599,1643, 16" shape="circle" />
        </map>
        <div className="zoomButtons" style={{pointerEvents: `${!!this.props.click ? "none" : "auto"}`}}>
          <p style={{cursor: "pointer"}} onPointerDown={this.handleZoomIn} > Increase </p>
          <p style={{cursor: "pointer"}} onPointerDown={this.handleZoomOut} > Decrease </p>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.mapData,
  mapNames: state.mapNames,
  mapSelect: state.mapSelect,
  mapLoaded: state.mapLoaded,
  mapZoomInfo: state.mapZoomInfo,
  click: state.click,
  currZoom: state.currZoom,
  defaultXOffset: state.defaultXOffset,
  defaultYOffset: state.defaultYOffset,
  zoomXOffset: state.zoomXOffset,
  zoomYOffset: state.zoomYOffset
})

const mapDispatchToProps = dispatch => ({
  handleMapData: (data) => dispatch(handleMapData(data)),
  handleZoomOffset: (data) => dispatch(handleZoomOffset(data)),
  handleMouseDown: () => dispatch(handleMouseDown()),
  handleMouseUp: () => dispatch(handleMouseUp()),
  handleMouseMove: (data) => dispatch(handleMouseMove(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(MapComponent)
