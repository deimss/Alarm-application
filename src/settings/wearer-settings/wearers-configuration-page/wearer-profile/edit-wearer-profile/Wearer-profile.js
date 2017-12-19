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
      deleteMemberGroup: null,    deleteMemberWearerId: null,
      wearerGroupData: []
  };

  this.handleChangeField = this.handleChangeField.bind(this);
  this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
  this.setData = this.setData.bind(this);
  this.handleDeleteMember = this.handleDeleteMember.bind(this);
  this.setWearerGroupData = this.setWearerGroupData.bind(this);
  // this.setNewGroupData = this.setNewGroupData.bind(this);
  }

  setWearerGroupData(){
     let groupArray = [];
     this.props.wearerGroupData.forEach(function(element){
        groupArray.push(Object.assign({}, element));
      })
      this.setState({wearerGroupData: groupArray});
      console.log("componentWillMount this.state.wearerGroupData", this.state.wearerGroupData); 
    };



  componentWillReceiveProps(nextProps) {   
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

    if(this.state.deleteMemberGroup.id != null && this.state.deleteMemberWearerId != null){
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
    this.props.updateWearer(newData);

    
    
  }

  // setNewGroupData(){
  //   if(this.state.deleteMemberGroup !=null this.state.deleteMemberWearerId != null){
  //     this.props.setNewGroupData(this.state.wearerGroupData)
  //   }
  // }

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
    let wearerGroupData = this.state.wearerGroupData;
    //let group = wearerGroupData.find(element=> element.id === group.id);
    let groupIndex = wearerGroupData.indexOf(group);
    wearerGroupData.splice(groupIndex, 1);
    this.setState({
      deleteMemberGroup: group,
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

  

// delete-group-button

  render() {  
        let groups = null;
        let groupList = null;
        let emptyGroupList = '-';

        let wearerGroup = this.state.wearerGroupData;

        if (this.props.wearerGroupData !== null){
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

        // groupList = <select>{groups}</select>;







   // let avatar = "data:image/png;base64,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";
    // <img src={`${wearer.image}`} alt=''/>
       //     if (this.state.image !== ''){
        //       avatar = this.state.image
         //   }; 

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
                     <ul> {groups} </ul>          
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