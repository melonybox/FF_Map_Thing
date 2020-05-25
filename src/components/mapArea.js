import React from 'react';
import {connect} from 'react-redux';
import {handleSvgArr} from '../actions/actions.js';

class MapArea extends React.PureComponent {
  dataSend = (elPos,markType) => {
    return {elPos: elPos, markType: markType}
  }

  handleSvgClick = (elPos, e) => {
    e.preventDefault()
    switch (this.props.markType) {
      case 'markEmpty':
        return this.props.handleSvgArr(this.dataSend(elPos,'markNotSpawn'))
      case 'markNotSpawn':
        return this.props.handleSvgArr(this.dataSend(elPos,'markSpawn'))
      case 'markSpawn':
        return this.props.handleSvgArr(this.dataSend(elPos,'markEmpty'))
      default:
        return this.props.handleSvgArr(this.dataSend(elPos,'markEmpty'))
    }
  }

  render(){
    return(
      <>
        <area onClick={this.handleSvgClick.bind(this, this.props.elPos)} style={{cursor: "pointer", userSelect: "none"}} alt={this.props.titleName} title={this.props.pointName} coords={`${this.props.xAxis}, ${this.props.yAxis}, "32"`} shape="circle" />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSvgArr: (data) => dispatch(handleSvgArr(data))
})

export default connect(null,mapDispatchToProps)(MapArea)
