import React from 'react';
import logo from "../../assets/images/loGo.png"

class Logo extends React.Component{ 
	render(){
		return <div className="logo">
      		<img src={logo} alt="" />
     		<p>Wristo</p>
    	</div>;
	}
}
export default Logo;