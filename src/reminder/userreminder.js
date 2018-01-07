import React, { Component } from 'react';
import './reminder.scss';
import axios from 'axios';
import Createwearer from './createwearer';

let arrayofid = [];

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
		else if(nextProps.wearershow === "All wearers" || nextProps.wearershow === 0){
			arrayofid = [];
			for(let i = 0; i < nextProps.wearers.length; i++){
				arrayofid[i] = nextProps.wearers[i]
			}
		} else if(nextProps.wearershow !== "All wearers"){
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