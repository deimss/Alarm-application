import React from 'react';
import classNames from 'classnames';
import NavbarButton from './navbarButton.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class SettingsNavbar extends React.Component{ 

constructor(props) {
    super(props);
    this.HandleSearch = this.HandleSearch.bind(this);
    this.handleAddWearerButtonClicked = this.handleAddWearerButtonClicked.bind(this);

    this.state = {
      wearerId: 1,
      liIsClicked : false,
      wearersBuffer: [],
      addWearerButtonClicked: false,

      // wearersData : [
      // {'id': '1','full_name': 'Joan', 'gender': 'Female', 'age': '78', 'weight': '72', 'heart_rate': '120-150', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
      // {'id': '2','full_name': 'Kate', 'gender': 'Female', 'age': '68', 'weight': '60', 'heart_rate': '60-120', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
      // {'id': '3','full_name': 'Mark', 'gender': 'Male', 'age': '70', 'weight': '65', 'heart_rate': '80 - 130', 'image': 'https://image.flaticon.com/icons/svg/145/145842.svg', 'master_id': '0'},
      // {'id': '4','full_name': 'Angelina', 'gender': 'Female', 'age': '50', 'weight': '85', 'heart_rate': '110-160', 'image': 'https://image.flaticon.com/icons/svg/145/145847.svg', 'master_id': '0'},
      // ],
      search: ""
    };
  };

// woman --> https://image.flaticon.com/icons/svg/145/145847.svg
// man ----> https://image.flaticon.com/icons/svg/145/145842.svg

  handleAddWearerButtonClicked(){
    this.setState({liIsClicked : false}); 
    this.setState({addWearerButtonClicked: true});
  };

  HandleSearch(event) {
      this.setState({search: event.target.value.substr(0,20)})
  };
      
 

 render(){

        let filteredWearers;
        let namesList = null;


        if (this.props.wearersData[0].id !== null){

          filteredWearers = this.props.wearersData.filter(
              (wearer) => {
                return wearer.full_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
              }
        );

            
            namesList = filteredWearers.map((wearer) => {

 

           let wearerElementStyle = classNames({
              'wearers__user': true,
              'selWearer':  this.props.wearerAdded && this.props.activeWearer === wearer.id ||  !this.state.addWearerButtonClicked && this.props.activeWearer === wearer.id || this.state.liIsClicked && this.props.activeWearer === wearer.id,
              'defWearer': (this.props.wearersData[0].id === wearer.id && !this.state.addWearerButtonClicked && !this.state.liIsClicked) 
            });




          return (
            <li className={wearerElementStyle} key={wearer.id.toString()} onClick={(event) => 
              {this.props.handleWearerData(wearer.id); 
              this.setState({wearerId:wearer.id}); 
              this.props.getWearerDevice(wearer.id); 
              this.props.getGroups(wearer.id); 
              this.setState({liIsClicked : true}); 
              this.setState({addWearerButtonClicked : false}); 
              this.props.resetWearerEdit();
            }}>

                <div className="wearers__user__logo"> <img src={`${wearer.image}`} alt='' /> </div> 
                <div className="wearers__user__name"> {wearer.full_name} </div>
            </li>
          )

          
        });

        }

        











        
        console.log('navbar namesList', namesList);

 return (
            <div>
            <div className="wearers">
                <div className="tile__header"> Wearers list </div>
                <div className="searchWrap">
                <svg className="search_icon" fill="#b3b3b3" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg> 
                    <input className="searchWearers" placeholder="Search" type="text" value={this.state.search} onChange={this.HandleSearch}/>
                </div>
                <div className="wearerList">
                    <ul>{namesList}</ul>
                </div>
            </div>
                <NavbarButton handleAddWearerButton={this.props.handleAddWearerButton} getWearers = {this.props.getWearers} handleAddWearerButtonClicked = {this.handleAddWearerButtonClicked} />
            </div>
        );
    }
}



export default SettingsNavbar;

