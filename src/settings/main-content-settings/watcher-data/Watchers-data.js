import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WatchersData extends React.Component{ 
    
    constructor(props) {
    super(props);
    this.state = {
      wristoData : [{'image':"url('data:image/png;base64,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')",'name': 'Wristo 1', 'simNumber': '+380698632654', 'uniqueWristoId': '4rt567hyt67888huyt900', 'status': 'active'},
      {'image':"url('data:image/png;base64,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')",'name': 'Wristo 2', 'simNumber': '+380698632655', 'uniqueWristoId': '4rt567hyt67888huy125', 'status': 'charging'} 
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
        </div>;

      const wristoDataTable = this.state.wristoData.map((dataElement) => {
          return (
            <tr key={dataElement.uniqueWristoId.toString()}>
              <td><div className='wrapper-first-td'><div className='image-before-td' style={{background:dataElement.image}} />
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
        <div className="wearerWatcherDataWrap">
  			  <div className="wearerProfile__header">
            <p>Watcher data</p>
              <button className="addNewWristo">
                    <svg className="addWristoDetails__icon" fill="white" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="addWristoDetails__name">Add new Watcher</span>
                </button>
          </div>
          
          <table className="wristo-configuration-table">
              <thead>
                <tr>
                  <th>FULL NAME</th>
                  <th>SIM NUMBER</th>
                  <th>EMAIL</th>
                  <th>PERMITION</th>
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



export default WatchersData;