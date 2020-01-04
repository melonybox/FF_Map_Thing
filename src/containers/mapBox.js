import React, {Component} from 'react';
import {connect} from 'react-redux';
import MapComponent from '../components/mapComponent.js'

class MapBox extends Component {

  render(){
    return(
      <div className="mapContainer" id="mapCont">
        <MapComponent />
      </div>
    )
  }
}

export default connect(null,null)(MapBox)
