import React from 'react';

class MapArea extends React.PureComponent {

  render(){
    return(
      <area style={{cursor: "pointer"}} alt={this.props.titleName} title={this.props.titleName} coords={this.props.areaCoords}shape="circle" />
    )
  }
}

export default MapArea
