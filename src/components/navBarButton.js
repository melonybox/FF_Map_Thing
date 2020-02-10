import React from 'react';
import {connect} from 'react-redux';
import {handleClearData} from '../actions/actions.js';

class NavBarButton extends React.PureComponent {

  handleMap = (mapNumber) => {
    const data = {mapNumber: mapNumber, mapName: "Amh_Araeng_-_Tarchia"}
    this.props.handleClearData(data)
  }

  render(){
    return(
      <>
        <button className="navText" type="button" onClick={() => this.handleMap(0)}>Tarchia</button>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleClearData: (data) => dispatch(handleClearData(data))
})

export default connect(null, mapDispatchToProps)(NavBarButton)

// getMapCoordsFetch
