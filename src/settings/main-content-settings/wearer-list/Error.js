import React from 'react';
import ReactDOM from 'react-dom';


class Errore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
      return (
        <div className="wearer-list-wrapper">
          <span>erorr</span>
        </div>    
      );
    } 
}

export default Errore;