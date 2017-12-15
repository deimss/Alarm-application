import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WearerProfile extends React.Component{ 



  constructor(props) {
    super(props);

    // this.editWearer = this.editWearer.bind(this);
    // this.state = {
    //   wearerData : [{'id': '0','full_name': 'Joan', 'gender': 'Female', 'age': '78', 'weight': '72', 'heart_rate': '120-150', 'image': 'string', 'master_id': '0'}, 
    //                ]
    // };
  };
  
  // editWearer(){

  //   this.props.handleWearerEdit();
  //   console.log('editWearer event', event);
  // };

    render(){
        // if (!this.props.wearerData || this.props.wearerData.length === 0) {
        //   return null;
        // }

        console.log('props.wearers', this.props.wearersData);

        // let wearersBuffer = this.props.wearersData;
 
        // // console.log(wearersBuffer);
        // let wearerID = this.props.wearerId;
        // console.log('wearerID', wearerID)
        // let wearerArray = wearersBuffer.filter(function (element){ 
        // // console.log('element',element);
        // if(element.id===wearerID) {return true}});//element

        // console.log('wearerArray', wearerArray);
        // let wearer = wearerArray[0];




        // let wearer = {'id': null, 'full_name': null, 'gender': null, 'age': null, 'heart_rate': null, 'weight':null, 'image': }
// img src={`${wearer.image}`} 

        let groups = null;
        let groupList = null;
        let emptyGroupList = '-';
        let wearer = this.props.wearersData;
        let avatar = "https://www.google.com.ua/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiztfjJ5IvYAhWDdpoKHRJrCQwQjRwIBw&url=https%3A%2F%2Fwww.abyssproject.net%2F2017%2F11%2Fcroisade-patcher-lintel-me%2F&psig=AOvVaw0QjBEPO2AKO-J97reF-d9Q&ust=1513419309575182";
// <img src={`${wearer.image}`} alt=''/>
        if (wearer.image !== null){
           avatar = wearer.image.url
        }; 

        let wearerGroup = this.props.wearerGroupData;

        if (this.props.wearerGroupData !== null){
          groups = wearerGroup.map((group) => {

          return (
            <option key={group.id.toString()}> {group.name}
            </option>
          )

          
        });
      }

      groupList = <select>{groups}</select>;


        console.log('groupList', groupList);

        return (
        <div className="wearerProfileWrap">
  			  <div className="wearerProfile__header">
            <p>Wearer profile</p>
            <button className="editWearerButton" onClick={()=> this.props.enableWearerEdit()}> 
              <svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </button>
          </div>
          <div className="wearerProfile__info">
            <div className="wearerProfile__image">
              <img src={avatar} alt=''/>
            </div>
            
            <div className="wearerProfile__info__table">
              <table>
                <tbody>
                  <tr>
                    <td>Full name</td>
                    <td>{wearer.full_name}</td>  
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{wearer.gender}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{wearer.age}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{wearer.weight}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Resting Max</p>
                      <p>heart rate</p>
                    </td>
                    <td>{wearer.heart_rate}</td>
                  </tr>
                  <tr>
                    <td>Group</td>
                    <td>{groupList || emptyGroupList}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
		    </div>
        );
    }
}



export default WearerProfile;

//|| '-'