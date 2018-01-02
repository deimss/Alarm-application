import React, { Component } from 'react';
import './reminder.scss';
//import './groups/groups.scss';
import Header from "../settings/wearer-settings/header/header";
import userImage from "../assets/icons/person.svg";
import Calendar from './calendar';
import axios from 'axios';
import group from '../assets/icons/group.svg';
import {master} from "../login/loginForm.js"

/*commit in other*/
let reminders = [];

class Reminder extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		cmbbox: "all users",
  		groups: [],
  		groupid: 0,
  		wearershow: "all users",
  		search: 0,
  		filteredreminders: []
  	}
  	this.changeWearer = this.changeWearer.bind(this);
  	this.onGroupClick = this.onGroupClick.bind(this);
  	this.getWearers = this.getWearers.bind(this);
  	this.switchwearer = this.switchwearer.bind(this);
  	this.getReminders = this.getReminders.bind(this);
  	this.createreminder = this.createreminder.bind(this);
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
      'uid': master.uid, 'client': master.client, 'access-token': master.accesstoken},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({wearers: response.data});
	    }).then(response => {
	    }).catch((error) => { 
	        console.log(error);
	    });
}
componentWillMount(){
	axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     'uid': master.uid, 'client': master.client, 'access-token': master.accesstoken},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({groups:  response.data});
	   		return response.data;
	    }).then(response => {
	    	this.state.groupid = response[0].id;
	    	this.getWearers(this.state.groupid)
	    }).then(response => {
	    	this.getReminders()
	    }).catch((error) => { 
	        console.log(error);
	        this.setState({error: true})
	    });
}
componentDidMount(){
	if(this.state.groupid) this.getReminders();
}
getReminders(){
		axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.state.groupid+'/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': master.uid, 'client': master.client, 'access-token': master.accesstoken},
	      responseType: 'json'
	   	}).then(response => {
	   		this.state.reminders = response.data;
	    }).catch((error) => { 
	        console.log("error", error);
	    });
}
findreminder(){
	let find, rem;
	find = this.refs.reminder.value;
	rem = this.state.reminders.filter(item => {
		return item.title.toLowerCase().indexOf(find.toLowerCase()) !== -1;})
	this.setState({filteredreminders: rem});
}
createreminder(item){
	return <li key={Math.floor(Math.random() * (10 - 1 + 1)) + 1} onClick={this.ch.bind(this)}>{item.title}</li>
}
ch(e){
	console.log("hello", e);
}
render(){
	let listOfGroups = this.state.groups.map(this.addGroup.bind(this))
	let listWearers, createreminders = [];
  	if(this.state.wearers)listWearers = this.state.wearers.map((item) => {
  		return <li onClick={(e) => this.switchwearer(item, e)} key={item.id}>{item.full_name}</li>
  	});
	if(this.state.filteredreminders) createreminders = this.state.filteredreminders.map(this.createreminder)
	return( 
		<div className="reminders">
		<Header />
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
						  <ul className="reminderslist">
						  {createreminders}
						  </ul>
					</div>
				</div>
			</div>

			<div className="reminders-table">
				<Calendar wearers={this.state.wearers} search={this.state.filteredreminders} id={this.state.groupid} wearershow={this.state.wearershow} filter={this.state.search}/>
			</div>
		</div>
	)
}
}

export default Reminder;