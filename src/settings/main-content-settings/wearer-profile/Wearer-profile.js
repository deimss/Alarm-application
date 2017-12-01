import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

class WearerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: null,
      valueFullName: '',
      valueGender: '',
      valueWeight: '',
      valueAge: ''


  };

  this.handleChangeField = this.handleChangeField.bind(this);
  }

  componentWillMount(){
    let id1 = this.props.data.filter((item) => item.id == 15 );
    console.log(id1)
    id1.map(id1 =>{
      this.setState({
        value: id1.heart_rate,
        valueFullName: id1.full_name,
        valueGender: '',
        valueWeight: id1.weight,
        valueAge: id1.age
     })
    } )
    
  }

  handleChangeField(inputName) {
    if(inputName === 'valueFullName'){
      return e => this.setState({
        [inputName]: (e.target.value)
        });
    }else if (inputName === 'valueAge' || inputName === 'valueWeight') {
      return e => this.setState({
        [inputName]: Number(e.target.value)
        })
    }else {
      return e => this.setState({
        [inputName]: e.target.value
        })
    }
  }
  

  render() { 
    const data = this.props.data;
    return (
      <div className="wearer-profile-wrapper">
        <div className="wearer-profile1">
          <p>Wearer profile</p>
          <div className="profile-full-name">
              <span>Full Name</span><input type='text' value={this.state.valueFullName} onChange={this.handleChangeField('valueFullName')} />
          </div>
          <div className="profile-gender">
              <span>Gender</span><div className="gender-position"><input type="radio"  value="Man" name="gender" id="man-radio-button" onChange={this.handleChangeField('valueGender')}/><label htmlFor="man-radio-button">Man</label></div>
              <div className="gender-position"><input type="radio" id="women-radio-button" value="Women" name="gender" onChange={this.handleChangeField('valueGender')}/><label htmlFor="women-radio-button">Woman</label></div>
          </div>
        </div>
        <div className="wearer-profile2">
          <div className="profile-full-name">
              <label>Age</label><input type='text' value={this.state.valueAge} onChange={this.handleChangeField('valueAge')}/><label>Weight</label><input type='text' value={this.state.valueWeight} onChange={this.handleChangeField('valueWeight')}/>
          </div>
          <div className="profile-heart-rate">
              <label>Calm heart<br/>rate</label>
              <div className="input-range-slider">
                <InputRange
                  maxValue={200}
                  minValue={50}
                  value={this.state.value}
                  onChange={value => this.setState({ value })} />
                </div>             
          </div>
          <ul className='range-timeline'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>  
            </ul>
        </div>
      </div>    
    );
  }
}

export default WearerProfile;