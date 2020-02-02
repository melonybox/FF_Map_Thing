import React from 'react';

class MapSvgPoints extends React.PureComponent {

  render(){
    return(
      <>
        <circle cx={this.props.xAxis} cy={this.props.yAxis} r="20" style={{fill: "rgb(102,102,102)", stroke: "rgb(51,51,51)", strokeWidth: "1", opacity: "1"}} />
      </>
    )
  }
}

export default MapSvgPoints
