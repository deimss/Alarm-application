import React from 'react';
import classNames from 'classnames';
import WearerProfile from '../wearer-profile/wearerProfile.js';
import WristoConfiguration from '../wristo-group-configuration/wristoGroupConfiguration.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WearerConfiguration extends React.Component{ 

    constructor(props) {
    super(props);
    //this.HandleWearerData = this.HandleWearerData.bind(this);
    };



    render(){

        console.log(this.props.wearersData);

      //   let wearersBuffer = this.props.wearersData;
      //   let wearerArray = wearersBuffer.filter((element)=>{ 
      //   if (element.id===this.props.wearerId) { return element}});


      // let wearer = wearerArray[0];
      // const {handleWearerData, wearer} = this.props

      // let wearer = this.props.wearer;
        return (
        <div className="wearerConfigWrap">
  			  <p className="wearerConfigWrap__name">Configuration Page</p>
          <p className="wearerConfigWrap__description">Manage information about wristo</p>
          <WearerProfile wearer = {wearer} />
          <WristoConfiguration/>
          <CarersData/>
		    </div>
        );
    }
}



export default WearerConfiguration;

 // <WearerProfile wearer = {wearer} />

 // <WearerProfile wearersData = {this.props.wearersData} />