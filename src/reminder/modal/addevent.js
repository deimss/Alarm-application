import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import addbtn from '../../assets/icons/add.svg';

export default class AddEvent extends React.Component{
	constructor(props){
		super(props);
    this.tooglemodal = this.tooglemodal.bind(this);
	  this.state = {
		Modal: false,
		alerts: "",
		type: ""
	}
  }
  tooglemodal(boo){
  	console.log("toogled ==")
    this.setState(state => ({Modal: !state.Modal}))
	    if(boo == true) {
	    	this.props.onChange();
	    	boo = false;
	    }
  	}
	render(){
		let style
		if(this.props.wearershow == "All wearers" || this.props.wearershow === 0){
			style = {display: "none"}; 
		}else {
			style = {display: "flex"};
		}
		return <div style={style} className="add-reminder" onClick={this.tooglemodal} >
		<img src={addbtn} />
		{this.state.Modal && ReactDOM.createPortal(<Hell onChange={this.tooglemodal} />, document.getElementById("portal"))}
	</div>
	}
}

class Hell extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
  	console.log(this.props)
    return (
      <div className="backdrop">
        <div className="modal-rename">
        <p>Delete group</p>
          <div className="message">Do you realy want to delete reminder</div>
          <div className="footer">
          </div>
        </div>
      </div>
    );
  }
}
