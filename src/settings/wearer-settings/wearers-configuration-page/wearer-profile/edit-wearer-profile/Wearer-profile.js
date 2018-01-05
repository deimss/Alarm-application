import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import FileBase64 from 'react-file-base64';

class EditWearerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      valueFullName: '',
      valueGender: '',
      valueWeight: '',
      valueAge: '',
      image: '',
      malechecked:'',
      famelechecked:'',
      deleteMemberGroup: [],    
      deleteMemberWearerId: null,
      wearerGroupData: [],
      changesNotApplied: false
  };

  this.handleChangeField = this.handleChangeField.bind(this);
  this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
  this.setData = this.setData.bind(this);
  this.handleDeleteMember = this.handleDeleteMember.bind(this);
  this.setWearerGroupData = this.setWearerGroupData.bind(this);
  this.discardChanges = this.discardChanges.bind(this);
  this.applyChanges = this.applyChanges.bind(this);
  }

  setWearerGroupData(){

    console.log('edit wearer this.props.wearerGroupData', this.props.wearerGroupData);

     let groupArray = [];
     if(this.props.wearerGroupData.length !== 0){
      this.props.wearerGroupData.forEach(function(element){
        groupArray.push(Object.assign({}, element));
      })
     }
     
      this.setState({wearerGroupData: groupArray});
    };

    applyChanges(){
      this.setState({
        changesNotApplied: false
      })
    }


    discardChanges(){
      this.setState({
        changesNotApplied: true
      })
    }

  componentWillReceiveProps(nextProps) {  

    console.log('componentWillReceiveProps nextProps', nextProps);

    if(this.state.changesNotApplied === true){

          if(nextProps.data.gender =='male'){
            this.setState({
              value: nextProps.data.heart_rate,
              valueFullName: nextProps.data.full_name,
              valueGender: nextProps.data.gender,
              valueWeight: nextProps.data.weight,
              valueAge: nextProps.data.age,
              image: nextProps.data.image.url,
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
            image: nextProps.data.image.url,
            famelechecked:'checked',
            malechecked: ''
       })
    }

    }


  }


  componentWillMount(){
    let objArray = this.props.data;
    if(objArray.gender =='male'){
        this.setState({
          value: objArray.heart_rate,
          valueFullName: objArray.full_name,
          valueGender: objArray.gender,
          valueWeight: objArray.weight,
          valueAge: objArray.age,
          image: objArray.image.url,
          malechecked:'checked'
       })
    }else {
        this.setState({
          value: objArray.heart_rate,
          valueFullName: objArray.full_name,
          valueGender: objArray.gender,
          valueWeight: objArray.weight,
          valueAge: objArray.age,
          image: objArray.image.url,
          famelechecked:'checked'
       })
    }
    this.setWearerGroupData();
    
  }

  setData(){

    console.log('setData this.state.deleteMemberGroup', this.state.deleteMemberGroup);



    if(this.state.deleteMemberGroup.length !== 0 && this.state.deleteMemberWearerId != null){
      this.props.deleteMember(this.state.deleteMemberGroup, this.state.deleteMemberWearerId)
    }

    let newData = {
      id: this.props.data.id,
      heart_rate: this.state.value,
      full_name: this.state.valueFullName,
      gender: this.state.valueGender,
      weight: this.state.valueWeight,
      age: this.state.valueAge,
      image: this.state.image
    }
    if(this.props.data.id === null){
      this.props.addWearer(newData);
    }
    else this.props.updateWearer(newData);

    
    
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


  handleDeleteMember(group, wearerId){
    console.log('handleDeleteMember(group)', group);
    console.log('handleDeleteMember(wearerId)', wearerId);

    let wearerGroupData = this.state.wearerGroupData;
    let groupIndex = wearerGroupData.indexOf(group);
    let deleteGroup = wearerGroupData.splice(groupIndex, 1);

    let deleteGroupArray = this.state.deleteMemberGroup;


    deleteGroupArray.push(deleteGroup[0]);



    console.log('handleDeleteMember deleteGroup ', deleteGroup);
    console.log('handleDeleteMember deleteGroupArray ', deleteGroupArray);

    this.setState({
      deleteMemberGroup: deleteGroupArray,
      deleteMemberWearerId: wearerId,
      wearerGroupData: wearerGroupData
    });
  }

  getFiles(e){
    console.log(image)
    let image = e[0].base64;
    this.setState({
      image: image
    })
  }



  render() {  

        console.log('changesNotApplied', this.state.changesNotApplied);
  
        let groups = null;
        let groupList = null;
        let emptyGroupList = '-';

        let wearerGroup = this.state.wearerGroupData;

        if (this.props.wearerGroupData.length !== 0){
          groups = wearerGroup.map((group) => {

          return (
            <li key={group.id.toString()}> {group.name}
              
              <button className="delete-group-button" onClick={()=> this.handleDeleteMember(group, this.props.data.id)}> 
                <svg fill="#B2B2B2" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </button>
            </li>
            )
          });
        }
        else groups =  '-' ;


        console.log('this.props.wearerGroupData', this.props.wearerGroupData);
        console.log('groups', groups);

    return (   
      <div className="wearer-profile-wrapper">
        <div className="wrapper-image-field">
              <p>Wearer profile</p>
              
              <div className="wearerProfile__image"><img src={this.state.image} className="avatar-edit" alt=''/>
              </div>
              <label class="fileContainer">Change image
              <div><FileBase64 multiple={ true } onDone={ this.getFiles.bind(this) } /></div>
              </label>
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
                <div className="edit-wearer-profile-group">
                      <label>Group</label>
                     <ul> {groups === null ? '-' : groups} </ul>          
                </div>
            </div>
            
        </div>           
        <div className='profile-button'>
            <button className="delete-setting-button" onClick={()=> {this.props.discardWearerChanges(); this.discardChanges()}}><svg fill="#B2B2B2" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg></button>
            <button className="save-setting-button" onClick={()=>{this.setData(); this.applyChanges()}}><svg fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg></button>
          </div>  
      </div>    
    );
  }
}

export default EditWearerProfile;