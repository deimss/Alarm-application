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
//import { response } from '../../../../.cache/typescript/2.6/node_modules/@types/spdy';

class MainContentSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      erorr: null,
      activeWearer: null
    };
    this.focusOnWearer = this.focusOnWearer.bind(this);
  }

  focusOnWearer(e){
    this.setState({
      activeWearer: Number(e)
    })
  }

 
// Optionally the request above could also be done as
  componentWillMount() {
    let self = this;
    axios.get('https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',{
      headers: {'client': 'JwFppy1u4PsgG9P5-cLFTw','access-token': 'WgU6VG07HgGL8K690XnS4w','uid': 'boretskairuna23@gmail.com'}
    })
    .then(function (response) {
      let firstWearer = response.data.filter(i => i)[0];
      self.setState({
        data: response.data,
        activeWearer: firstWearer.id,
        newData: response.data[0]
      })

    })
    .catch(function (error) {
      self.setState({error: error})
    });
  }

  render() {
    const activeWearer = this.state.data.find(i => i.id === this.state.activeWearer)
    return (
        <div className='main-content-wrapper'>
           {this.state.data.length === 0 ? <Loading /> : <WearerList focusOnWearer={e => this.focusOnWearer(e)} data={this.state.data}/>}
            <div className="wearers-configuration-wrapper">
              {this.state.data.length === 0 ? <Loading /> : <WearerProfile data={activeWearer} />}
              <WearerConfiguration />
              <WatchersData />
              <ButtonsDevSev />
            </div>

        </div>
      );
  }
}

export default MainContentSettings;