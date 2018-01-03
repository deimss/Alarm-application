import React, { Component } from 'react';
import './reminder.scss';
import edit from '../assets/icons/pensil.png';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Calendar from 'react-datetime';
import calendarimg from '../assets/icons/today.svg';
import addbtn from '../assets/icons/add.svg';
import delet from '../assets/icons/delete.svg';
import social from '../assets/icons/group.svg';
import crB from '../assets/icons/crB.svg';
import crY from '../assets/icons/crY.svg';


var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

let rerenderAdd = false;
let arrayofid = [];
class UserName extends React.Component{
	constructor(props){
    super(props);
    this.state = {
		isModalOpen: false,
		alerts: "",
		type: ""
	}
  }
  tooglemodal(){
    this.setState(state => ({isModalOpen: !state.isModalOpen}))
    if(rerenderAdd == true) {
    	this.props.onChange();
    	rerenderAdd = false;
    }
  }

  render(){
	return (
		<div className="user-name" >
			<div><img src={this.props.url} alt=""/><p>{this.props.firstname}<br/>{this.props.lastname}</p></div>	
			<div><img className="edit" src={edit} alt="" onClick={this.tooglemodal.bind(this)}/></div>
			{this.state.isModalOpen && ReactDOM.createPortal(<AddReminder wid={this.props.id} gid={this.props.groupid} item={this.props.item} name={this.props.firstname} onClose={this.tooglemodal.bind(this)}/>, document.getElementById("portal"))}
		</div>
	)
}
};
class AddReminder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	reminder: "",
    	openstart: "calendarnone",
    	openend: "calendarnone",
    	alerts: []
    }
    this.onchangeday = this.onchangeday.bind(this);
    this.changeclassstart = this.changeclassstart.bind(this);
    this.changeclasend = this.changeclasend.bind(this);
    this.alerttime = this.alerttime.bind(this);
    this.changetype = this.changetype.bind(this);
  }
  setReminder(){
  	this.setState({reminder: this.refs.reminder.value})
  }
  changeclassstart(){
  	if(this.state.openstart == "calendarnone"){
  		this.setState({openstart: ""})
  	}else {
  		this.setState({openstart: "calendarnone"})
  	}
  }
  changeclasend(){
  	if(this.state.openend == "calendarnone"){
  		this.setState({openend: ""})
  	}else {
  		this.setState({openend: "calendarnone"})
  	}
  }
  onchangeday(day, type){
  	if(type === "start"){
  		this.setState({openstart: "calendarnone",daystart: day.getDate(), monthstart: day.getMonth(), yearstart: day.getFullYear()});
  	}else{
  		this.setState({openend: "calendarnone", dayend: day.getDate(), monthend: day.getMonth(), yearend: day.getFullYear()});
  	}
  }
  alerttime(){
  	let arr = this.state.alerts;
  	arr.push(this.refs.addtime.value);
  	this.setState({alerts: arr});

  }
  createalert(item){
  	return <p>{item}</p>
  }
  changetype(type){
  	this.setState({type: type});
  }
  addreminder(){
  	let date;
  	for(let i = 0; i < this.state.alerts.length; i++){
		date = `${this.state.yearstart}` + "-" + `${this.state.monthstart+1}` + "-" + `${this.state.daystart}`+"T"+this.state.alerts[i];
  		axios({
	      method: 'post',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.props.gid+'/wearers/'+this.props.wid+'/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json',
	      data: {
			  "reminder": {
			    "title": this.state.reminder,
			    "category": this.state.type,
			    "start_date": date,
			    "end_date": date
			  }
			}
	   	}).then(resp => {
	   		if((i + 1) == this.state.alerts.length){
  				rerenderAdd = true;
  				this.props.onClose();
  		}
	   	}).catch((error) => { 
	        console.log("error", error);
	    });
  	}
  }
  clearfields(){
  	this.refs.reminder.value = "";
  	this.setState({daystart: "", monthstart: "", yearstart: "", dayend: "", monthend: "", yearend: "", alerts: [], type: ""})
  }
  render() {
  	let alert = this.state.alerts.map(this.createalert.bind(this));
    return (
      <div className="backdrop">
        <div className="modal-edit">
        <p>Add reminder to {this.props.name}</p>
          {this.props.children}
        <div className="edit-reminder">  
        	<p>Reminder</p>
        	<input ref="reminder" onChange={this.setReminder.bind(this)}/>
        </div>
        <div className="setdate">
        	<div className="start">
        		<p>{month[this.state.monthstart]} {this.state.daystart} {this.state.yearstart}</p>
        		<img onClick={this.changeclassstart} src={calendarimg}/>
        		
        	</div>
        		<Calendar className={'calstart ' + this.state.openstart} type="start" onchangeday={this.onchangeday}/>
        	<div className="end">
        		<p>{month[this.state.monthend]} {this.state.dayend} {this.state.yearend}</p>
        		<img onClick={this.changeclasend} src={calendarimg}/>
        	</div>
        		<Calendar className={'calend ' + this.state.openend} type="end" onchangeday={this.onchangeday}/>
        </div>
        <div className="addtime">
       		{alert}
        	<div>
        		<input ref="addtime" id="time" type="time" />
        		<img src={addbtn} onClick={this.alerttime}/>
        	</div>
        </div>
        <div className="reminder-type">
        	<p>Type of reminder</p>
        	<div className="combobox">
				<button className="dropbtn">{this.state.type}</button>
				<ul className="dropdown-content">
					<li key="1" onClick={() => this.changetype("medical")}>Medical</li>
					<li key="2" onClick={() => this.changetype("social")}>Social</li>
				</ul>
			</div>
        </div>
	    <div className="footer">
		    <div className="clearfields">
	            <img src={delet} onClick={this.clearfields.bind(this)} />
	        </div>
            <div>
	            <button onClick={this.props.onClose}>
	              cancel
	            </button>
	            <button onClick={this.addreminder.bind(this)}>
	              save
	            </button>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

class Edit extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="backdrop">
        <div className="modal-edit">
        <p>Hello</p>
        </div>
      </div>
    );
  }
}
class Delete extends React.Component {
	constructor(props){
		super(props);
	}
	renamegroup(){
		this.props.onClose("delete");
	}
	delete(e){
		e.preventDefault();
		axios({
	      method: 'delete',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/'+this.props.gid+'/wearers/'+this.props.wid+'/reminders/'+this.props.item.id,
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		rerenderAdd = true;
	   		this.props.onClose();
	    }).catch((error) => { 
	        console.log(error);
	    });
	}
  render() {
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Delete group</p>
          {this.props.children}
          <div className="message">Do you realy want to delete reminder {this.props.item.title}.</div>
          <div className="footer">
            <button onClick={this.renamegroup.bind(this)}>
              cancel
            </button>
            <button onClick={this.delete.bind(this)}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}
class Event extends React.Component{
	constructor(props){
		super(props);
		this.tooglemodal = this.tooglemodal.bind(this);
		this.state = {
		isModal: false,
		alerts: "",
		type: "", 
		icon: ""
	}
	}
	tooglemodal(){
	    this.setState(state => ({isModal: !state.isModal}))
	    if(rerenderAdd == true) {
	    	this.props.onChange();
	    	rerenderAdd = false;
	    }
	}
	render(){
		let icon, cross = {};
		this.props.icon == "s" ? icon = "http://www.youngdementiasupport.london/wp-content/themes/yod/images/icon-groups.svg" 
		: icon = "http://www.iconsplace.com/icons/preview/blue/pill-256.png";
		this.props.cros == "y" ? this.state.icon = crY : this.state.icon = crB;
		return (
			<div className="dayevents" style={{backgroundColor: this.props.color}}>
				<img src={icon} alt="" />
				<p>{this.props.title}<br/>{this.props.time}</p>	
				<img onClick={this.tooglemodal.bind(this)} className="delete-event" src={this.state.icon}/>
				{this.state.isModal && ReactDOM.createPortal(<Delete wid={this.props.item.wearer_id} gid={this.props.gid} item={this.props.item} name={this.props.firstname} onClose={this.tooglemodal.bind(this)}/>, document.getElementById("portal"))}
			</div>
		)
	}
};

//http://www.iconninja.com/files/522/978/507/delete-cancel-remove-cross-icon.svg
//https://image.flaticon.com/icons/png/128/59/59836.png
class Createwearer extends React.Component{
	constructor(props){
		super(props);
		this.createevent = this.createevent.bind(this);
		this.getReminders = this.getReminders.bind(this);
		this.state = {
			flag: false,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
			number: 0,
			event: ""
		}
	}
	createevent(item){
		var date = new Date(item.start_date);
		var hours = date.getHours(), minutes = date.getMinutes(),day = date.getDay() , color, icon, cross;
		if(hours < 10) hours = '0' + hours;
		if(minutes < 10) minutes = '0' + minutes;
		var time = `${hours}:${minutes}`;
		var category = item.category;
		//debugger;
		if(day == 1 && this.props.weekarray[0].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.monday.push(returnevent.call(this))
		}else if(day == 2 && this.props.weekarray[1].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.tuesday.push(returnevent.call(this))
		}else if(day == 3 && this.props.weekarray[2].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.wednesday.push(returnevent.call(this))
		}else if(day == 4 && this.props.weekarray[3].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.thursday.push(returnevent.call(this))
		}else if(day == 5 && this.props.weekarray[4].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.friday.push(returnevent.call(this))
		}else if(day == 6 && this.props.weekarray[5].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.saturday.push(returnevent.call(this))
		}else if(day == 0 && this.props.weekarray[6].day == date.getDate() && this.props.id == item.wearer_id){
			this.state.sunday.push(returnevent.call(this))
		}
		function returnevent(){
			switch (category) 
			{
			case "social": 
				icon = "s";
				cross = "y"
				color = "#FFF0D0"; break;
			case "medical": 
				icon = "m";
				cross = "b"
				color = "#E3F0F9"; break;
			default: 
				color = "#000"; break;
			}
			return (
			<Event cros={cross} onChange={this.getReminders} gid={this.props.groupid} time={time} color={color} item={item} title={item.title} icon={icon}/>
		) 
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			done: false,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: []
		})
		this.state.wearershow = nextProps.wearershow;
		this.state.event = nextProps.event;
		this.setState({filteredreminders: []});
		this.state.idid = nextProps.id;
		this.getReminders();
	}

	getReminders(){
		this.state.reminders = [];
		this.setState({
			done: false,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: []
		});
		axios({
	      method: 'get',
	      url: 'https://wristo-platform-backend-stg.herokuapp.com/api/v1/groups/' + this.props.groupid + '/wearers/' + this.state.idid + '/reminders',
	      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
     	 'uid': sessionStorage.getItem("uid"), 'client': sessionStorage.getItem("client"), 'access-token': sessionStorage.getItem("accesstoken")},
	      responseType: 'json'
	   	}).then(response => {
	   		this.setState({reminders:  response.data});
	    }).then(response => {
	    	this.filterReminders(this.state.reminders);
	    	this.setState({done: true});
	    }).catch((error) => { 
	        console.log(error);
	    });
	}

	componentWillMount(){
		this.state.idid = this.props.id;
		this.getReminders();
	}

	filterReminders(reminders){
		this.state.filteredreminders = [];
		this.state.filteredreminders = reminders.filter(item => {
			let date = new Date(item.start_date);
			if(this.state.event == "" && date.getDate() >= this.props.weekarray[0].day && date.getDate() <= this.props.weekarray[6].day
				&& date.getMonth() >= this.props.weekarray[0].month && date.getMonth() <= this.props.weekarray[6].month){
				return item;	
			} else if(this.state.event == item.title && date.getDate() >= this.props.weekarray[0].day && date.getDate() <= this.props.weekarray[6].day
				&& date.getMonth() >= this.props.weekarray[0].month && date.getMonth() <= this.props.weekarray[6].month){
				return item;	
			}
		})
		this.state.filteredreminders.map(this.createevent);
	}
	render(){
		if(this.state.done){
			return (
				<div className="user">
					<UserName onChange={this.getReminders} lastname={this.props.lastname} url={this.props.url} id={this.props.id} groupid={this.props.groupid} firstname={this.props.firstname}/>
					<div className="events" >
						{this.state.monday}
					</div>
					<div className="events" >
						{this.state.tuesday}
					</div>
					<div className="events" >
						{this.state.wednesday}
					</div>
					<div className="events" >
						{this.state.thursday}
					</div>
					<div className="events" >
						{this.state.friday}
					</div>
					<div className="events" >
						{this.state.saturday}
					</div>
					<div className="events" >
						{this.state.sunday}
					</div>
				</div>
			)
	} else { return null}
	}
}

export default class UserEvents extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			newWearers: [],
			wearershow: 0
		}
	}
	componentWillReceiveProps(nextProps){
		this.state.weekarray = nextProps.weekarray;
		this.state.wearershow = nextProps.wearershow;
		this.state.id = nextProps.id;
		this.state.event = nextProps.event;
		if(!nextProps.wearers) 
			return false
		else if(nextProps.wearershow === "all users" || nextProps.wearershow === 0){
			arrayofid = [];
			for(let i = 0; i < nextProps.wearers.length; i++){
				arrayofid[i] = nextProps.wearers[i]
			}
		} else if(nextProps.wearershow !== "all users"){
			arrayofid = [];
			for(let i = 0; i < nextProps.wearers.length; i++){
				if(nextProps.wearers[i].id == nextProps.wearershow) {
					arrayofid[0] = nextProps.wearers[i]
				}
			}
		}
		this.setState({filter: arrayofid.map(this.createwearer.bind(this))})
	}
	createwearer(item){
		return <Createwearer event={this.state.event} wearershow={this.state.wearershow} id={item.id} url={item.image.url} groupid={this.state.id}  firstname={item.full_name} weekarray={this.state.weekarray}/>
	}
	render(){
		return (
			<div>
				{this.state.filter}
			</div>
		)
	}
}