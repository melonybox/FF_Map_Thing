import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleClearData} from '../actions/actions.js';
import NavBarButton from '../components/navBarButton.js';


class NavBarBox extends Component {

  render(){
    return(
      <>
        {this.props.mapNames.map((item,idx) => {
          const mapSplit = item.split("_")
          const mapLength = mapSplit.length
          const mapName = mapSplit[mapLength - 1]
          return <NavBarButton key={idx} mapNameFile={item} mapNameNumber={idx} mapName={mapName} />
        })}
      </>
    )
  }
}

const mapStateToProps = state => ({
  mapNames: state.mapNames,
})

const mapDispatchToProps = dispatch => ({
  handleClearData: (data) => dispatch(handleClearData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarBox)

// getMapCoordsFetch
