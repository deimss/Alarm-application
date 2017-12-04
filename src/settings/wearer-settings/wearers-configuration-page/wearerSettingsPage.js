import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Header from '../header/header.js';
import SettingsNavbar from './wearer-navbar/navbar.js';
import WearerConfiguration from './wearer-configuration-page/wearerConfiguration.js';
import WristoConfiguration from './wristo-group-configuration/wristoGroupConfiguration.js';
import WearerError from './wearer-error.js';
import WearersLoading from './wearer-loading.js';
import WearerProfile from './wearer-profile/wearerProfile.js';
import CarersData from './carers-data/carersData.js';
import AddWearer from './wearer-profile/addWearer.js';
import AddCarer from './carers-data/addCarer.js';
import AddWristo from './wristo-group-configuration/addWristo.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class SettingsPage extends React.Component{ 

  constructor(props) {
    super(props);
    this.handleWearerData = this.handleWearerData.bind(this);
    this.getWearers = this.getWearers.bind(this);
    this.addWearer = this.addWearer.bind(this);
    this.getWearerDevice = this.getWearerDevice.bind(this);
    this.getCarers = this.getCarers.bind(this);

    this.state = {
      wearerId: null,
      axiosData: [],
      error: false, 
      wearerDevice: [],
      carers: [],
      addedNewWearer: false
      // newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null}
    }
  };




// addWearer(){
//   axios({
//       method: 'post',
//       url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
//       headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
//       'uid': 'boretskairuna23@gmail.com', 'client': 'aqtmsJ3OTtyESjb9YYRgmQ', 'access-token': 'RIlOD4nWyR905zNCgla-jw'},
//       data: {
//         "wearer": {
//           "full_name": "Test",
//           "gender": "male",
//           "age": 20,
//           "weight": 20,
//           "heart_rate": 220,
//           "image": "string"

//         }
//       }
//     })
// };

addWearer(){
  this.setState({addedNewWearer: true})

};

getWearers(){
  console.log('getWearers');
  axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'aqtmsJ3OTtyESjb9YYRgmQ', 'access-token': 'RIlOD4nWyR905zNCgla-jw'},
      responseType: 'json'
    }).then(response => {

             console.log('wearerId in axios = ' , response.data[0].id);
             this.setState({wearerId: response.data[0].id});
             this.getWearerDevice(response.data[0].id);
             this.setState({axiosData: response.data});

//ЧОМУ ТУ ВАЖЛИВА ПОСЛІЖОВНІСТЬ ЗАПИСУ СТЕЙТІВ wearerid i axiosdatd ?????
  // яКЩО ВКАЗАТИ СПОЧАТКУ axiosData то wearerId НЕ ЗАПИШЕТЬСЯ !?!?!?!?!?!?!?!?!?!

     

 //     console.dir('axiosData inside promise -->' + this.state.axiosData);

      }).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        });
    };







getWearerDevice(wearerId){
  console.log('wearerId state in main ==>' + wearerId);
  axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerId}/devices`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'aqtmsJ3OTtyESjb9YYRgmQ', 'access-token': 'RIlOD4nWyR905zNCgla-jw'},
      responseType: 'json'
    }).then(response => {
  
             // console.log('wearerDevice in axios = ' + response.data);
             this.setState({wearerDevice: response.data});
             console.log('wearerDevice response.data', response.data);
             }
             
).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        })
};

getCarers(){
 console.log('getCarers');
  axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'aqtmsJ3OTtyESjb9YYRgmQ', 'access-token': 'RIlOD4nWyR905zNCgla-jw'},
      responseType: 'json'
    }).then(response => {
             console.log('getCarers response data', response.data);
             this.setState({carers: response.data});

}).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        });
    };


componentWillMount() {          
  this.getWearers();
  this.getCarers();
    };





  handleWearerData(event) {
    console.log('event', event);
    this.setState({wearerId: event});
    this.getWearerDevice(event);
  };

    render(){


 console.log('wearerId  inside settingpage render -->' + this.state.wearerId);


   // let  wearersData = [
   //    {'id': '1','full_name': 'Joan', 'gender': 'Female', 'age': '78', 'weight': '72', 'heart_rate': '120-150', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
   //    {'id': '2','full_name': 'Kate', 'gender': 'Female', 'age': '68', 'weight': '60', 'heart_rate': '60-120', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
   //    {'id': '3','full_name': 'Mark', 'gender': 'Male', 'age': '70', 'weight': '65', 'heart_rate': '80 - 130', 'image': 'https://image.flaticon.com/icons/svg/145/145842.svg', 'master_id': '0'},
   //    {'id': '4','full_name': 'Angelina', 'gender': 'Female', 'age': '50', 'weight': '85', 'heart_rate': '110-160', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
   //    ];

      // let wearerArray = wearersData.filter((element)=>{ 
      //   if (element.id===this.state.wearerId) { return element}});


      // let wearer = wearerArray[0];


    return (
          <div>
          <Header/>
          <div >
          {
            this.state.addedNewWearer ? 
            <div>
            <AddWearer />
            <AddCarer/>
            <AddWristo/>
            </div>
            :
            <div>
            {
           this.state.error ? <WearerError /> : (this.state.axiosData.length && this.state.carers.length)!= 0 ? 
            <div className="contentWrap">
              <SettingsNavbar wearersData = {this.state.axiosData} handleWearerData={this.handleWearerData} addWearer={this.addWearer} getWearers = {this.getWearers} getWearerDevice={this.getWearerDevice} wearerId = {this.state.wearerId}/>
              <div className="wearerConfigWrap">
                <p className="wearerConfigWrap__name">Configuration Page</p>
                <p className="wearerConfigWrap__description">Manage information about wristo</p>
                <WearerProfile wearersData = {this.state.axiosData} wearerId = {this.state.wearerId}/>
                <WristoConfiguration getWearerDevice = {this.getWearerDevice} wearerDevice = {this.state.wearerDevice} error = {this.state.error} />
                <CarersData carers = {this.state.carers} error = {this.state.error}/>
              </div>
            </div>
            :
            <WearersLoading/>
          }
          </div>
        }
          

           

          </div> 
        </div>
        
        );
    }
}



export default SettingsPage;



            // <WearerConfiguration wearersData = {this.state.axiosData}  wearerId = {this.state.wearerId} />

 // <SettingsNavbar wearersData = {this.state.axiosData} handleWearerData={this.handleWearerData} />

            // { 
            //   wearerError ?
            //     <WearerError errorData={wearerError} >
            //     :
            //     wearerArray ?
            //       <WearerData data={wearerArray}
            //       :
            //       <WearerLoading />
            // }