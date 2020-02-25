import React from 'react';

class MapSvgPoints extends React.PureComponent {

  render(){
    return(
      <>
        <circle cx={this.props.xAxis} cy={this.props.yAxis} r={this.props.markType === "markSpawn" ? "32" : "16"} className={this.props.markType} />
      </>
    )
  }
}

export default MapSvgPoints
