import React from 'react';
import ReactDOM from 'react-dom';
import WearerList from './wearer-list/Wearer-list';
import WearerProfile from './wearer-profile/Wearer-profile';
import WearerConfiguration from './wearer-configuration/Wearer-configuration';
import WatchersData from './watcher-data/Watchers-data';
import ButtonsDevSev from './buttons/Buttons-save-del';
import axios from 'axios';
import Errore from './wearer-list/Error';
import Loading from './wearer-list/Loading';

class MainContentSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      erorr: null
    };
    //this.getData = this.getData.bind(this);
  }


 
// Optionally the request above could also be done as
  componentWillMount() {
    let self = this;
    axios.get('https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',{
      headers: {'client': 'JwFppy1u4PsgG9P5-cLFTw','access-token': 'WgU6VG07HgGL8K690XnS4w','uid': 'boretskairuna23@gmail.com'}
    })
    .then(function (response) {
      self.setState({data: response.data})
    })
    .catch(function (error) {
      self.setState({error: error})
    });
  }

  render() {
    return (
        <div className='main-content-wrapper'>
           {this.state.data.length === 0 ? <Loading /> : <WearerList data={this.state.data}/>}
            <div className="wearers-configuration-wrapper">
              {this.state.data.length === 0 ? <Loading /> : <WearerProfile data={this.state.data}/>}
              <WearerConfiguration />
              <WatchersData />
              <ButtonsDevSev />
            </div>

        </div>
      );
  }
}

export default MainContentSettings;