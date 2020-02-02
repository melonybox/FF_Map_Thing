import React from 'react';

class MapArea extends React.PureComponent {

  render(){
    return(
      <>
      <area style={{cursor: "pointer"}} alt={this.props.titleName} title={this.props.pointName} coords={`${this.props.xAxis}, ${this.props.yAxis}, 16`} shape="circle" />
      </>
    )
  }
}

export default MapArea
