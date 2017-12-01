import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WearerConfiguration extends React.Component{ 
    
    constructor(props) {
    super(props);
    // this.CreateWearersList = this.CreateWearersList.bind(this);
    // this.HandleSearch = this.HandleSearch.bind(this);
    this.state = {
      wristoData : [{'color':'orange','name': 'Wristo 1', 'simNumber': '+380698632654', 'uniqueWristoId': '4rt567hyt67888huyt900', 'status': 'active'},
      {'color':'green','name': 'Wristo 2', 'simNumber': '+380698632655', 'uniqueWristoId': '4rt567hyt67888huy125', 'status': 'charging'} 
                   ],

    };
  };




    render(){

const tableActions = <div>
          <button className="edit-group"> 
              <svg fill="#565656" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </button>
          <button className="delete-group">
            <svg fill="#565656" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
          <button className="settings-group ">
            <svg fill="#565656" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
            </svg>
          </button>
        </div>;



      const wristoDataTable = this.state.wristoData.map((dataElement) => {
          return (
            <tr key={dataElement.uniqueWristoId.toString()}>
              <td><div className='wrapper-first-td'><div className='image-before-td' style={{background:dataElement.color}} />
              <span>{dataElement.name}</span></div></td>
              <td>{dataElement.simNumber}</td>
              <td>{dataElement.uniqueWristoId}</td>
              <td>{dataElement.status}</td>
              <td>
                {tableActions}   
              </td>
            </tr>
          )
        });
        return (
        <div className="wearerProfileWrap">
  			  <div className="wearerProfile__header">
            <p>Wristo configuration</p>
              <button className="addNewWristo">
                    <svg className="addWristoDetails__icon" fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="addWristoDetails__name">Add new Wristo</span>
                </button>
          </div>
          
          <table className="wristo-configuration-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>SIM NUMBER</th>
                  <th>UNIQUE WRISTO ID</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                  {wristoDataTable} 
              </tbody>
          </table>

		    </div>
        );
    }
}



export default WearerConfiguration;