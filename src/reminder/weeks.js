import React, { Component } from 'react';

class Weeks extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	render(){
		return (
			<div className="change-week">
				<div> <p>Wearers list</p></div>
				<div> <p>Monday {this.props.weekarray[0].month+1}/{this.props.weekarray[0].day}</p></div>
				<div> <p>Tuesday {this.props.weekarray[1].month+1}/{this.props.weekarray[1].day}</p></div>
				<div> <p>Wednesday {this.props.weekarray[2].month+1}/{this.props.weekarray[2].day}</p></div>
				<div> <p>Thurstday {this.props.weekarray[3].month+1}/{this.props.weekarray[3].day}</p></div>
				<div> <p>Friday {this.props.weekarray[4].month+1}/{this.props.weekarray[4].day}</p></div>
				<div> <p>Saturday {this.props.weekarray[5].month+1}/{this.props.weekarray[5].day}</p></div>
				<div> <p>Sunday {this.props.weekarray[6].month+1}/{this.props.weekarray[6].day}</p></div>
			</div>
		)
	}
}

export default Weeks;