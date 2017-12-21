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
    this.state ={
      wearersData: this.props.wearersData
    }
  };


  componentWillReceiveProps(nextProps){
   // debugger
   // if(nextProps.wearersData){this.props.wearersData = nextProps.wearersData}

   // debugger
    this.setState({
      wearersData : nextProps.wearersData
    })
  }


    render(){

      console.log('WEARERPROFILE this.props.wearersData', this.props.wearersData);

        let groups = null;
        let groupList = null;
        let emptyGroupList = '-';
        let wearer = this.state.wearersData;
        let avatar;
        console.log('WEARAR URL IMAGE', wearer.image)
// <img src={`${wearer.image}`} alt=''/>
       // if (wearer.image === null){
       //  avatar = "https://wristoapp.s3.amazonaws.com/staging/uploads/wearer/image/48/image.jpeg";

     // }else {
     //  avatar = wearer.image.url;
     //  }
       // console.log('Avataaaer',avatar)
        let wearerGroup = this.props.wearerGroupData;

      //   if (this.props.wearerGroupData !== null){
      //     groups = wearerGroup.map((group) => {

      //     return (
      //       <option key={group.id.toString()}> {group.name}
      //       </option>
      //     )

          
      //   });
      // }

      // groupList = <select>{groups}</select>;


        console.log('this.props.wearerGroupData', this.props.wearerGroupData);

        if (this.props.wearerGroupData !== null){
          groups = wearerGroup.map((group) => group.name);

          groupList = groups.join(', ');
        };


        console.log('this.props.wearersData', this.props.wearersData);
        // console.log('wearerProfile groups', groups)

// disabled = {(this.state.disableEdit) ? "disabled" : ""}

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
              <img src={this.state.wearersData.image.url} alt='' width="196" height="216"/>
            </div>
            
            <div className="wearerProfile__info__table">
              <table>
                <tbody>
                  <tr>
                    <td>Full name</td>
                    <td>{wearer.full_name || emptyGroupList}</td>  
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{wearer.gender || emptyGroupList}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{wearer.age || emptyGroupList}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{wearer.weight || emptyGroupList}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Resting Max</p>
                      <p>heart rate</p>
                    </td>
                    <td>{wearer.heart_rate || emptyGroupList}</td>
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

