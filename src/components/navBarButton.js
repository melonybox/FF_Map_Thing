import React from 'react';

class NavBarButton extends React.PureComponent {

  render(){
    return(
      <>
        <button className="navText" type="button" onClick={() => this.handleMap(0)}>Tarchia</button>
      </>
    )
  }
}

export default NavBarButton
