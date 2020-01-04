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

    // if (height * widthScale > e.target.parentElement.clientHeight) {
    //   finalScale = heightScale
    //   let scaleMult = e.target.parentElement.clientWidth / (width * finalScale)
    //   let imgMult = width * scaleMult
    //   xOffset = (imgMult - width) / 2
    //   natContYa = height
    //   natContXa = imgMult
    // } else {
    //   finalScale = widthScale
    //   let scaleMult = e.target.parentElement.clientHeight / (height * finalScale)
    //   let imgMult = height * scaleMult
    //   yOffset = (imgMult - height) / 2
    //   natContYa = imgMult
    //   natContXa = width
    // }
    //
    // let finalScaleArr = []
    // let i = 0
    // let offsetZoomArrTemp = {}
    // let offsetZoomArr = {}
    // let boundingOffSetArr = {}
    //
    // for (i = 0; i < 4; i++) {
    //   if (i === 0) {
    //     finalScaleArr.push(finalScale)
    //   } else {
    //     finalScaleArr.push(finalScale * (((i * 25) * 0.01)+1))
    //     let imgHeightCent = (height / 2)
    //     let imgWidthCent = (width / 2)
    //     let multFact = (((i  * 25) * 0.01) + 1)
    //     let contHeightCent = (natContYa / 2 )
    //     let contWidthCent = (natContXa / 2 )
    //     let zoomAmountY = yOffset + ((imgHeightCent * multFact) - contHeightCent) * (contHeightCent / (contHeightCent * multFact))
    //     let zoomAmountX = xOffset + ((imgWidthCent * multFact) - contWidthCent) * (contWidthCent / (contWidthCent * multFact))
    //     offsetZoomArrTemp[i] = {yAxis: zoomAmountY, xAxis: zoomAmountX}
    //     boundingOffSetArr[i] = {yAxis: -((zoomAmountY - yOffset)*2), xAxis: -((zoomAmountX - xOffset)*2)}
    //     if (i === 1) {
    //       offsetZoomArr[i] = {yAxis: offsetZoomArrTemp[i].yAxis ,xAxis: offsetZoomArrTemp[i].xAxis}
    //     } else if (i > 1) {
    //       offsetZoomArr[i] = {yAxis:(offsetZoomArrTemp[i].yAxis - offsetZoomArrTemp[i - 1].yAxis) ,xAxis: (offsetZoomArrTemp[i].xAxis - offsetZoomArrTemp[i - 1].xAxis)}
    //     }
    //   }
    // }

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
      <div>
        <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}
          id="mapImage"
          onLoad={this.handleLoad}>
        </img>
        <map name="image-map">
          <area style={{cursor: "pointer"}} alt="a" title="a" coords="947,450,922,425" shape="rect" />
        </map>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.mapData,
  mapName: state.mapName,
  mapSelect: state.mapSelect
})

export default connect(mapStateToProps,null)(MapComponent)
