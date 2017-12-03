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
      valueAge: '',
      malechecked:'',
      famelechecked:''
  };

  this.handleChangeField = this.handleChangeField.bind(this);
  this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
  }

  componentWillMount(){

    let id1 = this.props.data.filter((item) => item.id == 15 );
    let objArray = id1.map(item => item)[0];
    if(objArray.gender =='male'){
      id1.map(id1 =>{
        this.setState({
          value: id1.heart_rate,
          valueFullName: id1.full_name,
          valueGender: id1.gender,
          valueWeight: id1.weight,
          valueAge: id1.age,
          malechecked:'checked'
       })
      } )
    }else {
      id1.map(id1 =>{
        this.setState({
          value: id1.heart_rate,
          valueFullName: id1.full_name,
          valueGender: id1.gender,
          valueWeight: id1.weight,
          valueAge: id1.age,
          famelechecked:'checked'
       })
      } )
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
              <div className="gender-position"><input type="radio" checked={this.state.famelechecked} id="women-radio-button" value="famale" name="gender" onClick={this.handleChangeRadioButton} onChange={this.handleChangeField('valueGender')}/><label htmlFor="women-radio-button">Famale</label></div>
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
            <button className="delete-setting-button"><svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg></button>
            <button className="save-setting-button"><svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg></button>
          </div>  
      </div>    
    );
  }
}

export default WearerProfile;