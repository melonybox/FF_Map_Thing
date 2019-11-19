import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount = () => {
    console.log("App Component Run")
  }

  render() {
      return (
        <div className="centerRow">
          <p>
            {this.props.mapData}
          </p>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    mapData: state.mapData
  })

export default connect(mapStateToProps,null)(App);
