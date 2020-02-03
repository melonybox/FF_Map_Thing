import React from 'react';

class MapArea extends React.PureComponent {
  handleSvgClick = (elPos, e) => {
    e.preventDefault()
    console.log(elPos)
  }

  render(){
    return(
      <>
        <area onClick={this.handleSvgClick.bind(this, this.props.elPos)} style={{cursor: "pointer", userSelect: "none"}} alt={this.props.titleName} title={this.props.pointName} coords={`${this.props.xAxis}, ${this.props.yAxis}, 16`} shape="circle" />
      </>
    )
  }
}

export default MapArea
