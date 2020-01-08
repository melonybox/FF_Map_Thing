import React from 'react';
import {connect} from 'react-redux';

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

    let masterScaleArr = []
    let i = 0
    let offsetZoomArrTemp = {}
    let offsetZoomArr = {}
    let boundingOffSetArr = {}

    for (i = 0; i < 4; i++) {
      if (i === 0) {
        masterScaleArr.push(defaultScale)
      } else {
        masterScaleArr.push(defaultScale * (((i * 25) * 0.01)+1))
        let imgHeightCent = (imgHeight / 2)
        let imgWidthCent = (imgWidth / 2)
        let multFact = (((i  * 25) * 0.01) + 1)
        let contHeightCent = (imgContX / 2 )
        let contWidthCent = (imgContY / 2 )
        let zoomAmountY = defaultYOffset + ((imgHeightCent * multFact) - contHeightCent) * (contHeightCent / (contHeightCent * multFact))
        let zoomAmountX = defaultXOffset + ((imgWidthCent * multFact) - contWidthCent) * (contWidthCent / (contWidthCent * multFact))
        offsetZoomArrTemp[i] = {yAxis: zoomAmountY, xAxis: zoomAmountX}
        boundingOffSetArr[i] = {yAxis: -((zoomAmountY - defaultYOffset)*2), xAxis: -((zoomAmountX - defaultXOffset)*2)}
        if (i === 1) {
          offsetZoomArr[i] = {yAxis: offsetZoomArrTemp[i].yAxis ,xAxis: offsetZoomArrTemp[i].xAxis}
        } else if (i > 1) {
          offsetZoomArr[i] = {yAxis:(offsetZoomArrTemp[i].yAxis - offsetZoomArrTemp[i - 1].yAxis) ,xAxis: (offsetZoomArrTemp[i].xAxis - offsetZoomArrTemp[i - 1].xAxis)}
        }
      }
    }

    // this.setState((state, props) => ({
    //   imgWidth: state.imgWidth = width,
    //   imgHeight: state.imgHeight = height,
    //   defaultScaleArr: state.defaultScaleArr = finalScaleArr,
    //   defaultYOffSet: state.defaultYOffSet = yOffset,
    //   defaultXOffSet: state.defaultXOffSet = xOffset,
    //   zoomXOffSet: state.zoomXOffSet = xOffset,
    //   zoomYOffSet: state.zoomYOffSet = yOffset,
    //   offsetZoomArr: state.offsetZoomArr = offsetZoomArr,
    //   boundingOffSetArr: state.boundingOffSetArr = boundingOffSetArr,
    //   currZoom: state.currZoom = 0
    // }))

    console.log("Handle Load Secund")
  }

  render(){
    return(
      <>
        <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}
          id="mapImage"
          alt={this.props.mapName}
          onLoad={this.handleLoad}>
        </img>
        <map name="image-map">
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="947,450,922,425" shape="rect" />
        </map>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.mapData,
  mapName: state.mapName,
  mapSelect: state.mapSelect
})

export default connect(mapStateToProps,null)(MapComponent)
