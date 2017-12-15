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
import Carers from './carers-data/carers.js';
import AddWearer from './wearer-profile/addWearer.js';

import EmptyCarer from './carers-data/emptyCarer.js';
import EmptyWristo from './wristo-group-configuration/emptyWristo.js';

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
    this.enableWearerEdit = this.enableWearerEdit.bind(this);
    this.resetWearerEdit = this.resetWearerEdit.bind(this);
    this.updateWearer = this.updateWearer.bind(this);
    this.handleAddWearerButton = this.handleAddWearerButton.bind(this);
    this.deleteCarer = this.deleteCarer.bind(this);
    this.addCarer = this.addCarer.bind(this);
    this.discardWearerChanges = this.discardWearerChanges.bind(this);
    this.getGroups = this.getGroups.bind(this);

    this.state = {
      wearerId: null,
      activeWearer: null,

      // activeWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null},
      wearerData: [{'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null, 'image': null}],
      wearerGroupData: null,
      firstIdWearer: null,
      error: false, 
      wearerDevice: [],
      carers: [],
      addNewWearerClicked: false,
      wearersLoaded: false,
      emptyWearersLoaded: false,
      carersLoaded: false, 
      wearerDeviceLoaded: false,
      wearersEditing: false,
      carersEditing: false,
      wearerDeviceEditing: false,
      wearerAdded: false,
      newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null, 'image': null}
    }
  };


// 'image': 'https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png'

componentWillMount() {          
  this.getWearers();
  this.getCarers();
 // this.getWearerDevice();
    };



handleAddWearerButton(){

  this.setState({addNewWearerClicked: true});
  this.setState({wearerAdded: false});
}

getGroups(wearerId){

  console.log('GETGROUPS');

  axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerId}/groups`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {
        console.log('getGroups response', response);

        this.setState({wearerGroupData: response.data});

      }).catch((error) => { 
        console.log('getGroups error ====> ', error);

        });
}

addWearer(event){
  if(event != undefined) this.setState({wearerDevice: [] })
  console.log('addWearer');
  console.log('addWearer event',event);
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
        if (error.response.status === 404){
            this.setState({error: true})
        } 
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
        if (error.response.status === 404){
            this.setState({error: true})
        } 
        })
  
};

updateWearerDevices(event){
  console.log('updateWearerDevices event',event);
  axios({
      method: 'put',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${event.id}/devices/${event.idDevice}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      data: {
        name: event.name,
        phone_number: event.phone_number,
        status: event.status
      }
    }).then(() => {
      console.log('event.idEEEEEEEEEEEEEEEEEEE',event)
      //this.setState({addNewWearerClicked: false});
      this.getWearerDevice(event.id)
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
      this.setState({error: true})
        })
  
};

deleteWearerDevices(event){
  console.log('updateWearerDevices event',event);
  axios({
      method: 'delete',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${event.id}/devices/${event.idDevice}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
    }).then(() => {
      console.log('event.idEEEEEEEEEEEEEEEEEEE',event)
      //this.setState({addNewWearerClicked: false});
      this.getWearerDevice(event.id)
              //this.setState({wearerId: event.id});
             }
             
).catch((error) => { 
        console.log(error);
      //  this.setState({error: true})
        })
  
};

addWearerDevices(event){
  console.log('NEW DATA FOR DEVICES',event)
  axios({
      method: 'post',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${event.id}/devices`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      data: {
          name: event.name,
          phone_number: event.phone_number,
          status: event.status
      }
    }).then((response) => {
            //  this.setState({addNewWearerClicked: false});
              this.getWearerDevice(event.id);
             }
             
).catch((error) => { 
        console.log(error);
      //  this.setState({error: true})
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

             console.log('wearers response status = ' , response.status);
             console.log('wearers response data length= ' , response.data.length);


            if (response.status === 200 && response.data.length !== 0){
              this.setState({
                wearerDeviceLoaded: true,
                wearersLoaded: true,
                firstIdWearer: response.data[0].id 
                })
            };
            
            let toogledWearerId;

                if (event !== undefined) {toogledWearerId = event.id} 
                  else if (response.data.length !== 0) {toogledWearerId = response.data[0].id};


            console.log('toogledWearerId', toogledWearerId);

            
            if(response.data.length !== 0) {
              this.setState({
                wearerId: response.data[0].id,
                activeWearer: toogledWearerId,
                wearerData: response.data,
              })
              this.getWearerDevice(toogledWearerId);
            }; 
            this.getWearerDevice(toogledWearerId);
            this.getGroups(toogledWearerId);

//ЧОМУ ТУ ВАЖЛИВА ПОСЛІЖОВНІСТЬ ЗАПИСУ СТЕЙТІВ wearerid i axiosdata ?????
//ЯКЩО ВКАЗАТИ СПОЧАТКУ wearerData то wearerId НЕ ЗАПИШЕТЬСЯ !?!?!?!?!?!?!?!?!?!

      }).catch((error) => { 
        console.log('getWearers error ====> ', error);

        if (error.response.status === 404){
            this.setState({error: true})
        } 
        else this.setState({wearersLoaded: true})
        });

        //       let emptyData=false;

        // this.state.wearerData.forEach(function(element){

        //     for (let i in element){
        //     if (element[i] === null){
        //         emptyData = true;
        //     }
        // }
        // });
  };







getWearerDevice(wearerId){
  console.log('getWearerDevice');

  console.log('wearerId state in main ==>' + wearerId);
  axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${wearerId}/devices`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {

             console.log('wearerDevice response.data', response.data);
             console.log('wearerDevice response.status', response.status);


              this.setState({
                wearerDevice: response.data,
                // wearerDeviceLoaded: true
              })


              if(response.status === 200 && response.data.length !== 0){
              this.setState({
                wearerDeviceLoaded: true })

             }
             
}, err => console.log(err)).catch((error) => { 
        console.log(error);
        if (error.response.status == 404){
            this.setState({error: true})
        } 
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

          if(response.status === 200 || response.data.length !== 0){
              this.setState({
                carers: response.data,
                carersLoaded: true
              })
             };

}).catch((error) => { 
        console.log('error ====> ', error);
        if (error.response.status === 404){
            this.setState({error: true})
        } 
        });
    };



addCarer(event){
  console.log('addCarer event', event);
  axios({
      method: 'post',
      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      data: {
        "carer": {
          "first_name": event.first_name,
          "last_name": event.last_name,
          "email": event.email,
          "age": event.age,
          "password": event.password,
          "password_confirmation": event.password

        }
      }
    }).then((response) => {

      console.log("addCarer response.status", response.status);

                this.getCarers();
              
             }
             
).catch((error) => { 
        console.log('addCarer error.response.status ====> ', error.response.status);
        if (error.response.status === 404){
            this.setState({error: true})
        } else this.getCarers();

        })
};


deleteCarer(event){
  console.log('getWearers');
  axios({
      method: 'delete',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/carers/${event}`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(response => {

            console.log('wearers response = ' , response);

            console.log('wearers response data length = ' , response.data.length);

            this.getCarers();
      
            })
    // .catch((error) => { 
    //       console.log(error);
    //       if (error.response.status === 404){
    //         this.setState({error: true})
    //     } 
    //       });
      };




  handleWearerData(event) {
    console.log('event', event);
    this.setState({addNewWearerClicked: false});
    this.setState({wearerId: event});
    this.setState({activeWearer: event});
   //this.getWearerDevice(event);
  };



  enableWearerEdit(){
    this.setState({wearersEditing: true});
    this.setState({addNewWearerClicked: false});
    // console.log('enableWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

  discardWearerChanges(){
    this.setState({wearersEditing: false});
    this.setState({addNewWearerClicked: false});
  }

 resetWearerEdit(){
    this.setState({wearersEditing: false});
    console.log('enableWearerEdit this.state.wearersEditing', this.state.wearersEditing);
  };

    render(){
console.log('wearerAdded inside settingpage render -->' + this.state.wearerAdded);

 console.log('wearerId  inside settingpage render -->' + this.state.wearerId);

console.log('wearerGroupData ---------->>>>>>', this.state.wearerGroupData)
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

      let wearersDataForChildren;

          if(activeWearer === undefined) {
            wearersDataForChildren = this.state.newWearer;
          } 
          else {
            wearersDataForChildren = activeWearer;
          };
       

      
      console.log('activeWearer', activeWearer);

      console.log('this.state.wearerData.length', this.state.wearerData.length);

      console.log('this.state.wearersLoaded', this.state.wearersLoaded);

      console.log('this.state.wearerDevice', this.state.wearerDevice);

      console.log('this.state.wearerDeviceLoaded', this.state.wearerDeviceLoaded);

      console.log('enableWearerEdit this.state.wearersEditing', this.state.wearersEditing);

      console.log('this.state.addNewWearerClicked', this.state.addNewWearerClicked);

    return (
          <div>
          <Header/>
          <div>
              <div className="contentWrap">
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.wearersLoaded ?
                    <SettingsNavbar getGroups = {this.getGroups} wearersData = {this.state.wearerData} handleWearerData={this.handleWearerData} handleAddWearerButton={this.handleAddWearerButton} getWearers = {this.getWearers} getWearerDevice={this.getWearerDevice} wearerId = {this.state.wearerId} activeWearer = {this.state.activeWearer} resetWearerEdit = {this.resetWearerEdit} wearerAdded = {this.state.wearerAdded}/>
                    :
                    <WearersLoading/> 
                  }

                

              <div className="wearerConfigWrap">
                    <p className="wearerConfigWrap__name">Configuration Page</p>
                    <p className="wearerConfigWrap__description">Manage information about wristo</p>
                    {
                    this.state.error ? <WearerError />
                    :

                    this.state.wearersLoaded ?
                    
                    this.state.addNewWearerClicked ?
                      <AddWearer data = {this.state.newWearer} discardWearerChanges = {this.discardWearerChanges} addWearer = {this.addWearer} />
                      :
                      this.state.wearersEditing ? 
                      <EditWearerProfile data = {wearersDataForChildren} discardWearerChanges = {this.discardWearerChanges} updateWearer = {this.updateWearer} getWearers = {this.getWearers}/> 
                      :
                      <WearerProfile wearerGroupData = {this.state.wearerGroupData} getGroups = {this.getGroups} wearersData = {activeWearer} wearerId = {this.state.wearerId} enableWearerEdit = {this.enableWearerEdit}/>
                    
                    :
                    <WearersLoading/> 
                    }

                  
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.wearerDeviceLoaded ?

                    <WristoConfiguration addNewWearerClicked={this.state.addNewWearerClicked} firstIdWearer = {this.state.firstIdWearer} getWearerDevice = {this.getWearerDevice} updateWearerDevices ={this.updateWearerDevices} deleteWearerDevices = {this.deleteWearerDevices} addWearerDevices={this.addWearerDevices} wearerID = {this.state.activeWearer} wearerDeviceData = {this.state.wearerDevice} error = {this.state.error} />
                    :
                    <WearersLoading/>
                  }
                  
                  {
                    this.state.error ? <WearerError />
                    :
                    this.state.carersLoaded ?
                    
                    <Carers carers = {this.state.carers} error = {this.state.error} deleteCarer = {this.deleteCarer} addCarer = {this.addCarer} addNewWearerClicked = {this.state.addNewWearerClicked}/>
                    :
                    <WearersLoading/>                 
                  }



              </div>

            
            </div>
           </div> 
        </div>
        );
    }
}



export default SettingsPage;



// activeWearer.id === null ?
//                     <AddWearer data = {this.state.newWearer} enableWearerEdit = {this.enableWearerEdit} addWearer = {this.addWearer} />
//                     :


// <WearerProfile wearersData = {activeWearer} wearerId = {this.state.wearerId} enableWearerEdit = {this.enableWearerEdit}/>
// <WearerProfile wearersData = {this.state.newWearer} enableWearerEdit = {this.enableWearerEdit}/>