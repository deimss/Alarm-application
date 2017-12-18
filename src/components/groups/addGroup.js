import React, { Component } from 'react';
import './groups.scss';
import group from '../../assets/icons/group.svg'
import adduser from '../../assets/icons/add.svg'

const DropDownMenu = (props) => {
	return <ul className="dropdown">
		<li onClick={() => props.onListClick("rename", props.item)}>rename</li>
		<li onClick={() => props.onListClick("duplicate", props.item)}>duplicate</li>
		<li onClick={() => props.onListClick("delete", props.item)}>delete</li>
	</ul>
}

export default class AddGroup extends React.Component{
	constructor(props){
		super(props);;
		this.state = {
			hover: ""
		}
	}
	addGroup(item){
		return <div key={item.id + 1} className="group" style={{backgroundColor: item.id == this.props.active ? "#d2d2d2" : "transparent"}} onClick={() => this.props.onGroupClick(item)}>
			<div className="groupbutton"><img src={group} alt="" />
			<p>{item.name}</p></div>
			<DropDownMenu onListClick={this.props.onListClick} item={item}/>
		</div>
	}
	render(){
		let listOfGroups = this.props.groups.map(this.addGroup.bind(this))
		return <div className="add-group">
			{listOfGroups}
			<div className="addnwegroup" onClick={() => this.props.onListClick("new")}>
				<img src={adduser} alt="" />
				<p>Add New</p>
			</div>
	</div>
	}
}


// var days = [-10,-9,-8,-5,-3,0,1,2,3,4,5,6,7,10,13,15,16,20];

// var Day = React.createClass({
// 	onMouseOver: function(elem){
// 		this.props.onHover(this.props.index);
// 	},
// 	render: function(){
		
// 		return <div 
// 							className={"day " + this.props.hoverState}
// 							onMouseOver={this.onMouseOver} >
// 								{this.props.val}
// 					 </div>;
// 	}
// })

// var Days = React.createClass({
	
// 	getInitialState: function() {
//     return {selected: "", hover: ""};
//   },
// 	getHoverState: function(index) {
// 		if(this.state.hover - 1 === index || this.state.hover + 1 === index){
// 			return "sibling";
// 		} else if(this.state.hover === index) {
// 			return "current";
// 		}
// 		return "";
// 	},
// 	onHover: function(index){
// 		this.setState({hover: index});
// 	},
// 	onMouseOut: function(){
// 		this.setState({hover: ""});
// 	},
// 	render: function(){
// 		var all_days = this.props.list.map(function(d, i){
// 			return <Day index={i} key={d} val={d} hoverState={this.getHoverState(i)} onHover={this.onHover} />
// 		}.bind(this));
// 		return <div onMouseOut={this.onMouseOut}> {all_days}</div>;
// 	}
// });

// /*
//  * Entry point
//  */

// ReactDOM.render(
//   <Days list={days} />,
//   document.getElementById('days')
// )