import React from 'react';
import {connect} from 'react-redux';

class MapComponent extends React.PureComponent {
  render(){
    
    return(
      <div>
        <img src={`/maps/${this.props.mapName[this.props.mapSelect]}.jpg`}>
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
