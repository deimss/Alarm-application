import React from 'react';
import './notifications.scss'
import {HeaderTwoBtn} from '../otherComponents/header';



function AddEvent(props){
	return <div className="addEvent">
				<img src={props.link} alt="" />
				<div>
					<h3>{props.name}<span>&bull;</span><span>{props.time}</span></h3>
					<p>{props.event}</p>
				</div>
			</div>
}

class Notifications extends React.Component{

render(){
	return (
		<div className="notifications">
			<HeaderTwoBtn header="Notifications"/>
			<div className="events">
				<AddEvent event="Emergency button activated." time="2 mins ago" name="linda" link="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG"/>
				<AddEvent event="Fall sensor activated." time=" 11:42 AM" name="linda" link="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG"/>
				<AddEvent event="Emergency button activated." time="9:15 AM" name="kate" link="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG"/>
				<AddEvent event="Fall sensor activated." time=" 8:25 AM" name="linda" link="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG"/>
				<AddEvent event="Fall sensor activated." time=" 10:30 PM" name="linda" link="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRW4ytGaB2CQdvs-uQ5wZ3hX2Kjq3ZPRoHO47sFmyk3Qv6j_iDG"/>
			</div>
			<div className="showAll">
					<p>see all</p>
			</div>
		</div>
	)
}
}
export default Notifications;