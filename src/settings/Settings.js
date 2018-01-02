import React from 'react';
import ReactDOM from 'react-dom';
import css from './settings.scss';
import Navbar from './navbar/Navbar';
import MainContentSettings from './main-content-settings/Main-content-settings';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div>
          <Navbar />
          <MainContentSettings />
        </div>
      );
  }
}

export default Settings;