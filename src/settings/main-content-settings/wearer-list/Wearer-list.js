import React from 'react';
import ReactDOM from 'react-dom';


class WearerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wearers: []
  };
  this.filterList = this.filterList.bind(this);
  this.focusOnSearch = this.focusOnSearch.bind(this);
  this.focusOnWearer = this.focusOnWearer.bind(this);
  }

  componentWillMount(){
    this.setState({wearers: this.props.data})
  }

  focusOnWearer(e){
    let id = e.target.id;
    this.props.focusOnWearer(id);
  }


  focusOnSearch() {
    this.searchInput.focus();
  }

  filterList(event){
    let updatedList = this.props.data;
    updatedList = updatedList.filter((item)=> {
      return item.full_name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({wearers: updatedList});
  }

  render() {
    const data = this.props.data;
   // let li = this.state.wearers.map((number) => number);
   // console.log(li);
      return (
        <div className="wearer-list-wrapper">
          <p>Configuration page</p>
          <div className='wearer-list-container'>       
            <div className='wearer-list-header'>
              <p>Weares list</p>
            </div>
            <div className='wearer-list-search'>    
              <input type="text" placeholder='Search' onChange={this.filterList} ref={(input) => { this.searchInput = input; }} />
              <div onClick={this.focusOnSearch}><svg fill="#B3B3B3" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </div>   
            </div>
            <div className="wearer-list-set">
              {this.state.wearers.map((number) =>
              <li onClick={this.focusOnWearer} id={number.id} key={number.id}><div className='image-list-container'><div className="image-for-list"></div></div>{number.full_name}</li> )}
            </div>    
            <div className="weares-list-members-new">
              <div><svg fill="#B52F54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
                </svg></div>
              <div><span>Add Wearer</span></div>
            </div>
          </div>
        </div>    
      );
    } 
}

export default WearerList;