import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

class EditWearerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      valueFullName: '',
      valueGender: '',
      valueWeight: '',
      valueAge: '',
      malechecked:'',
      famelechecked:''
  };

  this.handleChangeField = this.handleChangeField.bind(this);
  this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
  this.setData = this.setData.bind(this);
  }

  componentWillReceiveProps(nextProps) {   
    if(nextProps.data.gender =='male'){
        this.setState({
          value: nextProps.data.heart_rate,
          valueFullName: nextProps.data.full_name,
          valueGender: nextProps.data.gender,
          valueWeight: nextProps.data.weight,
          valueAge: nextProps.data.age,
          malechecked:'checked',
          famelechecked: ''
       })
    }else {
        this.setState({
          value: nextProps.data.heart_rate,
          valueFullName: nextProps.data.full_name,
          valueGender: nextProps.data.gender,
          valueWeight: nextProps.data.weight,
          valueAge: nextProps.data.age,
          famelechecked:'checked',
          malechecked: ''
       })
    }

  }


  componentWillMount(){
    let objArray = this.props.data;
    console.log('Obj newdata',objArray)
    if(objArray.gender =='male'){
        this.setState({
          value: objArray.heart_rate,
          valueFullName: objArray.full_name,
          valueGender: objArray.gender,
          valueWeight: objArray.weight,
          valueAge: objArray.age,
          malechecked:'checked'
       })
    }else {
        this.setState({
          value: objArray.heart_rate,
          valueFullName: objArray.full_name,
          valueGender: objArray.gender,
          valueWeight: objArray.weight,
          valueAge: objArray.age,
          famelechecked:'checked'
       })
    }
  }

  setData(){
    let newData = {
      id: this.props.data.id,
      heart_rate: this.state.value,
      full_name: this.state.valueFullName,
      gender: this.state.valueGender,
      weight: this.state.valueWeight,
      age: this.state.valueAge,
      image: this.props.data.image
    }
    this.props.updateWearer(newData);
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


  handleChangeRadioButton(e){
    if(e.target.value === 'male'){
      this.setState({
        malechecked: 'checked',
        famelechecked: '',
      })
    }else {
      this.setState({
        famelechecked: 'checked',
        malechecked: '',
    })
  }
  }

  render() {  
    return (   
      <div className="wearer-profile-wrapper">
        <div className="wrapper-image-field">
              <p>Wearer profile</p>
              <div className="image-wearer"/>
              <div><a href="#">Change image</a></div>
        </div>
        <div className="wearer-profile1">

          <div className="profile-full-name">
              <span>Full Name</span><input type='text' value={this.state.valueFullName} onChange={this.handleChangeField('valueFullName')} />
          </div>
          <div className="profile-gender">
              <span>Gender</span><div className="gender-position"><input type="radio" value="male" name="gender" checked={this.state.malechecked} id="man-radio-button" onClick={this.handleChangeRadioButton} onChange={this.handleChangeField('valueGender')}/><label htmlFor="man-radio-button">Male</label></div>
              <div className="gender-position"><input type="radio" checked={this.state.famelechecked} id="women-radio-button" value="female" name="gender" onClick={this.handleChangeRadioButton} onChange={this.handleChangeField('valueGender')}/><label htmlFor="women-radio-button">Female</label></div>
          </div>
          <div className="wearer-profile2">
              <div className="profile-age-weight">
                <div>
                    <label>Age</label><input type='text' value={this.state.valueAge} onChange={this.handleChangeField('valueAge')}/>
                </div>
                <div>
                    <label>Weight</label><input type='text' value={this.state.valueWeight} onChange={this.handleChangeField('valueWeight')}/>
                </div>
                  
              </div>
              <div className="wrap-profile-heart-rate">
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
        </div>           
        <div className='profile-button'>
            <button className="delete-setting-button" onClick={()=> this.props.discardWearerChanges()}><svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg></button>
            <button className="save-setting-button" onClick={()=>{this.setData(); this.props.discardWearerChanges()}}><svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg></button>
          </div>  
      </div>    
    );
  }
}

export default EditWearerProfile;