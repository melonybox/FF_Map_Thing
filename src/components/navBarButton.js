import React from 'react';
import {connect} from 'react-redux';
import {handleClearData} from '../actions/actions.js';

class NavBarButton extends React.PureComponent {

  handleMap = (mapNumber, event) => {
    if (this.props.mapSelect !== this.props.mapNameNumber) {
      const data = {mapNumber: mapNumber, mapName: event.target.name}
      this.props.handleClearData(data)
    }
  }

  render(){
    return(
      <>
        <button className="navText" type="button" style={{cursor: "pointer"}} name={this.props.mapNameFile} onClick={this.handleMap.bind(this, this.props.mapNameNumber)}>{this.props.mapName}</button>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mapSelect: state.mapSelect
})

const mapDispatchToProps = dispatch => ({
  handleClearData: (data) => dispatch(handleClearData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarButton)
