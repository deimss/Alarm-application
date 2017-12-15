import React, { Component } from 'react';
import './reminder.scss';
import './groups/groups.scss';
import Header from "../settings/wearer-settings/header/header";
import userImage from "../assets/icons/person.svg";
import Calendar from './calendar';
import axios from 'axios';
import group from '../assets/icons/group.svg';

class Reminder extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		cmbbox: "all users",
  		groups: [],
  		groupid: 0,
  		wearershow: "all users",
  		search: 0
  	}
  	this.changeWearer = this.changeWearer.bind(this);
  	this.onGroupClick = this.onGroupClick.bind(this);
  	this.getWearers = this.getWearers.bind(this);
  	this.switchwearer = this.switchwearer.bind(this);
}


addGroup(item){
	let color = "#f5f5f5";
	if(item.id == this.state.groupid) color = "#d2d2d2"; 
	return <div className="group" style={{backgroundColor: color}} onClick={() => this.onGroupClick(item.id)}>
			<div className="groupbutton"><img src={group} alt="" />
			<p>{item.name}</p></div>
		</div>
}
switchwearer(item){
	this.state.wearershow = item.id;
	this.changeWearer(item);
}
onGroupClick(id){
	this.setState({groupid: id});
	this.getWearers(id);
}
changeWearer(item){
	this.setState({cmbbox: item.full_name});
}
getWearers(id){
	this.state.wearers = [];
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + id + '/wearers',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({wearers: response.data});
	    }).then(response => {
	    }).catch((error) => { 
	        console.log(error);
	    });
}
getallreminders(){
	
}
componentWillMount(){
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({groups:  response.data});
	   		return response.data;
	    }).then(response => {
	    	this.state.groupid = response[0].id;
	    	this.getWearers(this.state.groupid)
	    }).catch((error) => { 
	        console.log(error);
	        this.setState({error: true})
	    });
}
findreminder(){

}
render(){
	let listOfGroups = this.state.groups.map(this.addGroup.bind(this))
	let listWearers;
  	if(this.state.wearers)listWearers = this.state.wearers.map((item) => {
  		return <li onClick={(e) => this.switchwearer(item, e)} key={item.id}>{item.full_name}</li>
  	});
	return( 
		<div className="reminders">
		<Header />
			<p style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>All Wearers</p>
			<div className="switch-wearers">
				<div className="add-group">
					{listOfGroups}
				</div>
				<div>
					<div className="user-image"><img src={userImage}/></div>
					<div className="combobox">
						<button className="dropbtn">{this.state.cmbbox}</button>
						<ul className="dropdown-content">
						<li key="" onClick={(e) => this.switchwearer({full_name: "all users", id: 0}, e)} >
						All users</li>{listWearers}</ul>
					</div>
					<div className="search">
						  <input placeholder="Search" className="input" ref="reminder" onChange={this.findreminder.bind(this)}/>
					</div>
				</div>
			</div>

			<div className="reminders-table">
				<Calendar wearers={this.state.wearers} id={this.state.groupid} wearershow={this.state.wearershow} filter={this.state.search}/>
			</div>
		</div>
	)
}
}

export default Reminder;