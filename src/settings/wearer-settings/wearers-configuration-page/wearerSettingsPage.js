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
import EditWearerProfile from './wearer-profile/edit-wearer-profile/Wearer-profile.js';
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
    this.handleWearerEdit = this.handleWearerEdit.bind(this);
    this.resetWearerEdit = this.resetWearerEdit.bind(this);
    this.updateWearer = this.updateWearer.bind(this);
    this.handleAddWearerButton = this.handleAddWearerButton.bind(this);

    this.state = {
      wearerId: null,
      activeWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null},
      wearerData: [{'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null}],
      error: false, 
      wearerDevice: [],
      carers: [],
      addNewWearerClicked: false,
      wearersLoaded: false,
      carersLoaded: false, 
      wearerDeviceLoaded: false,
      wearersEditing: false,
      carersEditing: false,
      wearerDeviceEditing: false,
<<<<<<< HEAD
      newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null},
      wearerAdded: false
=======
      newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null, 'image': 'https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png'}
>>>>>>> 794620e24cd8a2c8d6ff23b9d12ef6bfebc30792
    }
  };


componentWillMount() {          
  this.getWearers();
  this.getCarers();
    };



handleAddWearerButton(){

  this.setState({addNewWearerClicked: true});
  this.setState({wearerAdded: false});
}

addWearer(event){
  axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      data: {
        "wearer": {
          "full_name": event.full_name,
          "gender": event.gender,
          "age": event.age,
          "weight": event.weight,
          "heart_rate": event.heart_rate,
          "image": event.image

        }
      }
    }).then((response) => {
              this.setState({addNewWearerClicked: false});
              this.getWearers(response.data);
              console.log('addWearer response status', response.status);
              if(response.status==201){
                  this.setState({wearerAdded: true})
              }
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        })
};

updateWearer(event){
  console.log('updateWearer');
  console.log('updateWearer event',event);
  axios({
      method: 'put',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${event.id}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      data: {
        "wearer": {
          "full_name": event.full_name,
          "gender": event.gender,
          "age": event.age,
          "weight": event.weight,
          "heart_rate": event.heart_rate,
          "image": event.image

        }
      }
    }).then(() => {
      this.setState({addNewWearerClicked: false});
              this.getWearers(event);
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        })
  
};



getWearers(event){
  console.log('getWearers');
  axios({
      method: 'get',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {
             console.log('wearerId in axios = ' , response.data[0].id);

             console.log('wearers response data = ' , response.data);

             console.log('wearers response data length = ' , response.data.length);

            this.getWearerDevice(response.data[0].id);

           let wearerIdToogle = (event)=> {if (event != undefined) {return event.id} else {return response.data[0].id}};
           let toogledWearerId = wearerIdToogle(event);
            console.log('toogledWearerId', toogledWearerId);
            if(response.data.length != 0) {
              this.setState({

                wearerId: response.data[0].id,
                activeWearer: toogledWearerId,
                wearerData: response.data,
                wearersLoaded: true
            });

             };

//ЧОМУ ТУ ВАЖЛИВА ПОСЛІЖОВНІСТЬ ЗАПИСУ СТЕЙТІВ wearerid i axiosdatd ?????
// яКЩО ВКАЗАТИ СПОЧАТКУ wearerData то wearerId НЕ ЗАПИШЕТЬСЯ !?!?!?!?!?!?!?!?!?!

     

 //     console.dir('wearerData inside promise -->' + this.state.wearerData);

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
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {

             console.log('wearerDevice response.data', response.data);

             if(response.data.length != 0){
              this.setState({
                wearerDevice: response.data,
                wearerDeviceLoaded: true })
             };
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
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {
          
          console.log('getCarers response data', response.data);

          if(response.data.length != 0){
              this.setState({
                carers: response.data,
                carersLoaded: true
              })
             };

}).catch((error) => { 
        console.log(error);
        this.setState({error: true})
        });
    };






  handleWearerData(event) {
    console.log('event', event);
    this.setState({addNewWearerClicked: false});
    this.setState({wearerId: event});
    this.setState({activeWearer: event});
    this.getWearerDevice(event);
  };



  handleWearerEdit(){
    this.setState({wearersEditing: !this.state.wearersEditing});
    console.log('handleWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

 resetWearerEdit(){
    this.setState({wearersEditing: false});
    console.log('handleWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

    render(){
console.log('wearerAdded inside settingpage render -->' + this.state.wearerAdded);

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

      const activeWearer = this.state.wearerData.find(i => i.id === this.state.activeWearer);
      console.log('this.state.activeWearer', this.state.activeWearer);
      console.log('activeWearer', activeWearer);

    return (
          <div>
          <Header/>
          <div>
            
              <div className="contentWrap">
              {
                 this.state.error ? <WearerError /> : this.state.wearersLoaded ? 
                <SettingsNavbar wearersData = {this.state.wearerData} handleWearerData={this.handleWearerData} handleAddWearerButton={this.handleAddWearerButton} getWearers = {this.getWearers} getWearerDevice={this.getWearerDevice} wearerId = {this.state.wearerId} activeWearer = {this.state.activeWearer} resetWearerEdit = {this.resetWearerEdit} wearerAdded = {this.state.wearerAdded}/>
                :

                <WearersLoading/>
              }
              

                <div className="wearerConfigWrap">
                <p className="wearerConfigWrap__name">Configuration Page</p>
                <p className="wearerConfigWrap__description">Manage information about wristo</p>
                {
                  this.state.error ? <WearerError /> : this.state.addNewWearerClicked ?
                  (
                    this.state.wearersEditing ? 
                    <AddWearer data = {this.state.newWearer} handleWearerEdit = {this.handleWearerEdit} addWearer = {this.addWearer} />
                    : 
                    <WearerProfile wearersData = {this.state.newWearer} handleWearerEdit = {this.handleWearerEdit}/> 
                  )
                 :

                  this.state.wearersLoaded ? 
                  (
                    this.state.wearersEditing ? 
                    <EditWearerProfile data = {activeWearer} handleWearerEdit = {this.handleWearerEdit} updateWearer = {this.updateWearer} getWearers = {this.getWearers}/>
                    :
                    <WearerProfile wearersData = {activeWearer} wearerId = {this.state.wearerId} handleWearerEdit = {this.handleWearerEdit}/>
                  )
                  :
                  <WearersLoading/>
                }
                {
                  this.state.error ? <WearerError /> : this.state.addNewWearerClicked ?
                  <AddWristo/> :
                  this.state.wearerDeviceLoaded ? 
                  <WristoConfiguration getWearerDevice = {this.getWearerDevice} wearerDevice = {this.state.wearerDevice} error = {this.state.error} />
                  :
                  <WearersLoading/>
                }
                {
                  this.state.error ? <WearerError /> : this.state.addNewWearerClicked ?
                  <AddCarer/> :
                  this.state.carersLoaded ? 
                  <CarersData carers = {this.state.carers} error = {this.state.error}/>
                  :
                  <WearersLoading/>
                }

                </div> 
              
          
            
                
            </div>

          }


          </div> 
        </div>
        
        );
    }
}



export default SettingsPage;

