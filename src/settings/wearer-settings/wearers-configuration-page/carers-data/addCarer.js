import React from 'react';
import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class AddCarer extends React.Component{ 
    
   constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDiscardChange = this.handleDiscardChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);

    this.state = {
      first_name: '', 
      last_name: '', 
      email: '', 
      age:'', 
      password: '',
      inputKey: 0,
     
    };
};

  handleInputChange(valueKey, event){
      
      switch (valueKey) {
        case 'first_name': this.setState({first_name: event.target.value});
        break;
        case 'last_name': this.setState({last_name: event.target.value});
        break;
        case 'email': this.setState({email: event.target.value});
        break;
        case 'age': this.setState({age: event.target.value});
        break;
        case 'password': this.setState({password: event.target.value});
        break;
      
      };
  };

      handleDiscardChange(event){

       this.setState({
          first_name: '', 
          last_name: '', 
          email: '', 
          age:'', 
          password: ''
       });

       this.props.handleDiscardNewCarer();
    };

      handleSaveChange(){
        let newCarer = {
          'first_name': this.state.first_name, 
          'last_name': this.state.last_name, 
          'email': this.state.email, 
          'age': this.state.age, 
          'password': this.state.password,
          'password_confirmation': this.state.password
        };
        this.props.addCarer(newCarer);
        this.props.handleDiscardNewCarer();
      }

    render(){

     return (
        <div className="wearerProfileWrap">
          <div className="wearerProfile__header">
            <p>Carers data</p>
              <button className="add-new-carer">
                    <svg className="add-new-carer__icon" fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="add-new-carer__name">Add New Carer</span>
                </button>
          </div>
          
            <table className="new-carer-data-table">
              <thead>
                <tr>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>AGE</th>
                  <th>PASSWORD</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                  <tr key={0}>
                    <td><input className='edit-input' type='text' value={this.state.first_name} onChange={(event)=>this.handleInputChange('first_name', event)}/></td>
                    <td><input className='edit-input' type='text' value={this.state.last_name}  onChange={(event)=>this.handleInputChange('last_name',event)}/></td>
                    <td><input className='edit-input' type='text' value={this.state.email}      onChange={(event)=>this.handleInputChange('email',event)}/></td>
                    <td><input className='edit-input' type='text' value={this.state.age}        onChange={(event)=>this.handleInputChange('age',event)}/></td>
                    <td><input className='edit-input' type='text' value={this.state.password}   onChange={(event)=>this.handleInputChange('password',event)}/></td>
                    <td>
                      <div className='profile-button'>
                          <button className="discard-edit-group" onClick={this.handleDiscardChange}>
                            <svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                          </button>
                          <button className="save-edit-group" onClick={this.handleSaveChange}>
                            <svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                          </button>
                      </div> 
                    </td>
                  </tr>
              </tbody>
          </table>
          </div>
        )
    }
}



export default AddCarer;