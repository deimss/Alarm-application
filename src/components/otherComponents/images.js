import React from 'react';



const imground = {
	border: "50%"
}


export const ImageRound = (props) => {
	return <img alt="" style={imground} src={props.url}/>
}



export const ImageGoogle = () => {
	return <img alt="" src="http://thefretboard.co.uk/plugins/GoogleSignIn/design/google-icon.png" style={{
		backgroundColor: "red",
		height: "100px",
		width: "100px"
	}}/>;
}