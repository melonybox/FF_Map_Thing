import React from 'react';
import {connect} from 'react-redux';
import {handleClearData} from '../actions/actions.js';

class NavBarButton extends React.PureComponent {

  handleMap = (mapNumber, event) => {
    const data = {mapNumber: mapNumber, mapName: event.target.name}
    this.props.handleClearData(data)
  }

  render(){
    return(
      <>
        <button className="navText" type="button" name="Amh_Araeng_-_Tarchia" onClick={this.handleMap.bind(this, 0)}>Tarchia</button>
        <button className="navText" type="button" name="Il_Mheg_-_Aglaope" onClick={this.handleMap.bind(this, 1)}>Aglaope</button>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleClearData: (data) => dispatch(handleClearData(data))
})

export default connect(null, mapDispatchToProps)(NavBarButton)

// getMapCoordsFetch
