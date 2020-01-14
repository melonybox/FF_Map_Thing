import React from 'react';
import {connect} from 'react-redux';
import {getMapData,getZoomOffset} from '../actions/actions';

class MapComponent extends React.PureComponent {

  componentDidMount = () => {
    console.log("Resize Run")
    window.addEventListener('resize', this.handleLoad);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handeLoad);
  }

  handleLoad = () => {
    let mapImage = document.getElementById("mapImage")
    let mapCont = document.getElementById("mapCont")
    let imgWidth = mapImage.width
    let imgHeight = mapImage.height
    let imgContWidth = mapCont.clientWidth
    let imgContHeight = mapCont.clientHeight
    let widthScale = imgContWidth / imgWidth
    let heightScale = imgContHeight / imgHeight
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
        mapZoomInfo[i] = {zoomScale: (defaultScale * (((i * 25) * 0.01) + 1))}
        let imgHeightCent = (imgHeight / 2)
        let imgWidthCent = (imgWidth / 2)
        let multFact = (((i  * 25) * 0.01) + 1)
        let contHeightCent = (imgContY / 2 )
        let contWidthCent = (imgContX / 2 )
        let zoomAmountY = defaultYOffset + ((imgHeightCent * multFact) - contHeightCent) * (contHeightCent / (contHeightCent * multFact))
        let zoomAmountX = defaultXOffset + ((imgWidthCent * multFact) - contWidthCent) * (contWidthCent / (contWidthCent * multFact))
        offsetZoomArrTemp[i] = {yAxis: zoomAmountY, xAxis: zoomAmountX}
        mapZoomInfo[i] = {...mapZoomInfo[i], boundsYAxis: -((zoomAmountY - defaultYOffset)*2), boundsXAxis: -((zoomAmountX - defaultXOffset)*2)}
        if (i === 1) {
          mapZoomInfo[i] = {...mapZoomInfo[i], zoomOffsetYAxis: offsetZoomArrTemp[i].yAxis ,zoomOffsetXAxis: offsetZoomArrTemp[i].xAxis}
        } else if (i > 1) {
          mapZoomInfo[i] = {...mapZoomInfo[i], zoomOffsetYAxis:(offsetZoomArrTemp[i].yAxis - offsetZoomArrTemp[i - 1].yAxis) ,zoomOffsetXAxis: (offsetZoomArrTemp[i].xAxis - offsetZoomArrTemp[i - 1].xAxis)}
        }
      }
    }

    this.props.getMapData(mapZoomInfo,defaultXOffset,defaultYOffset)
  }

  handleZoomIn = () => {
    let zoom = document.getElementById("mapImage")

    if (this.props.currZoom !== 3) {
      zoom.style.transition = "0.2s"
      let currZoom = this.props.currZoom + 1
      let zoomXOffset = this.props.zoomXOffset - this.props.mapZoomInfo[currZoom].zoomOffsetXAxis
      let zoomYOffset = this.props.zoomYOffset - this.props.mapZoomInfo[currZoom].zoomOffsetYAxis
      this.props.getZoomOffset(currZoom,zoomXOffset,zoomYOffset)
      setTimeout(() => {
        zoom.style.transition = null
      }, 200)
    }
  }

  handleZoomOut = () => {
    let zoom = document.getElementById("mapImage")

    if (this.props.currZoom !== 0) {
      if (this.props.currZoom === 1) {
        zoom.style.transition = "0.2s"
        let currZoom = this.props.currZoom - 1
        let zoomXOffset = this.props.defaultXOffset
        let zoomYOffset = this.props.defaultYOffset
        this.props.getZoomOffset(currZoom,zoomXOffset,zoomYOffset)
        setTimeout(() => {
          zoom.style.transition = null
        }, 200)
      } else if (this.props.currZoom > 1) {
        zoom.style.transition = "0.2s"
        let currZoom = this.props.currZoom - 1
        let zoomXOffset = this.props.zoomXOffset + this.props.mapZoomInfo[currZoom + 1].zoomOffsetXAxis
        let zoomYOffset = this.props.zoomYOffset + this.props.mapZoomInfo[currZoom + 1].zoomOffsetYAxis
        this.props.getZoomOffset(currZoom,zoomXOffset,zoomYOffset)
        setTimeout(() => {
          zoom.style.transition = null
        }, 200)
      }
    }
  }

  render(){
    return(
      this.props.mapLoaded === false ?
      <>
        <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}
          onLoad={this.handleLoad}
          id="mapImage"
          alt={this.props.mapName[this.props.mapSelect]}
          style={{display: "none"}}
          >
        </img>
        <p className="zoomCenter">Loading...</p>
      </>
      :
      <>
        <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}
          onLoad={this.handleLoad}
          id="mapImage"
          alt={this.props.mapName[this.props.mapSelect]}
          style={{transform: `scale(${this.props.mapZoomInfo[this.props.currZoom].zoomScale})
                              translateX(${this.props.currZoom === 0 ? this.props.defaultXOffset : this.props.zoomXOffset}px)
                              translateY(${this.props.currZoom === 0 ? this.props.defaultYOffset : this.props.zoomYOffset}px)`}}
          >
        </img>
        <map name="image-map">
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="947,450,922,425" shape="rect" />
        </map>
        <div className="zoomButtons">
          <p style={{cursor: "pointer"}} onClick={this.handleZoomIn} > Increase </p>
          <p style={{cursor: "pointer"}} onClick={this.handleZoomOut} > Decrease </p>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.mapData,
  mapName: state.mapName,
  mapSelect: state.mapSelect,
  mapLoaded: state.mapLoaded,
  mapZoomInfo: state.mapZoomInfo,
  currZoom: state.currZoom,
  defaultXOffset: state.defaultXOffset,
  defaultYOffset: state.defaultYOffset,
  zoomXOffset: state.zoomXOffset,
  zoomYOffset: state.zoomYOffset
})

const mapDispatchToProps = dispatch => ({
  getMapData: (zoomMapInfo, defaultXOffSet, defaultYOffSet) => dispatch(getMapData(zoomMapInfo, defaultXOffSet, defaultYOffSet)),
  getZoomOffset: (currZoom, zoomXOffset, zoomYOffset) => dispatch(getZoomOffset(currZoom, zoomXOffset, zoomYOffset))
})

export default connect(mapStateToProps,mapDispatchToProps)(MapComponent)
