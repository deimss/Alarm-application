import React from 'react';
import classNames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class AddWearer extends React.Component{ 



  constructor(props) {
    super(props);
    this.state = {
    newWearer: {'id': null, 'full_name': null, 'gender': null, 'age': null, 
    'heart_rate': null, 'weight':null, 'master_id':null, 
    'image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWsjTM9wIYQ-L9K5yj7MvBI222lgSd3fpML3zmdwQ8oPHS1Y4"}
    }
    

  };
  
    render(){

        // console.log('props.wearers', this.props.wearersData);

        // let wearersBuffer = this.props.wearersData;
        // // console.log(wearersBuffer);
        // let wearerID = this.props.wearerId;
        // console.log('wearerID', wearerID)
        // let wearerArray = wearersBuffer.filter(function (element){ 
        // // console.log('element',element);
        // if(element.id===wearerID) {return true}});//element

        // console.log('wearerArray', wearerArray);
        // let wearer = wearerArray[0];

// img src={`${wearer.image}`}
        return (
        <div className="wearerProfileWrap">
  			  <div className="wearerProfile__header">
            <p>Wearer profile</p>
            <button className="editWearerButton">
            </button>
          </div>
          <div className="wearerProfile__info">
            <img src={`${this.state.newWearer.image}`} alt='' />
            <div className="wearerProfile__info__table">
              <table>
                <tbody>
                  <tr>
                    <td>Full name</td>
                    <td>this.state.newWearer.full_name</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>this.state.newWearer.gender</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>this.state.newWearer.age</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>this.state.newWearer.weight</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Resting Max</p>
                      <p>heart rate</p>
                    </td>
                    <td>this.state.newWearer.heart_rate</td>
                  </tr>
                  <tr>
                    <td>Group</td>
                    <td>this.state.newWearer.master_id</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
		    </div>
        );
    }
}



export default AddWearer;