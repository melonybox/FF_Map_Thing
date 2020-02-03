import React from 'react';

class MapSvgPoints extends React.PureComponent {

  render(){
    return(
      <>
        <circle cx={this.props.xAxis} cy={this.props.yAxis} r="16" className={this.props.markType} />
      </>
    )
  }
}

export default MapSvgPoints
