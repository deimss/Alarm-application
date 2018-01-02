import css from './list.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class List extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fruit: ['banana','orange','apple'],
      newItem: ''
    }
    this.addNewItem = this.addNewItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange(event){
    this.setState({newItem:event.target.value})
  }
  
  deleteItem(event){
  let value = event.target.getAttribute('typename');
  let key = event.target.getAttribute('keyes');
  console.log(value,key)
  let massive = [...this.state.fruit];

  let newArray = massive.filter((elem,index) => {
      return elem !== value &&  index !== key   
    } 
  )
  this.setState({fruit: [...newArray]})
  }

  addNewItem(e){
    e.preventDefault();
    let newItem = this.state.newItem;
    console.log(this.state.newItem)
    this.setState({
     fruit: [...this.state.fruit,newItem]
    })
  }

  render(){
    return (
    <div className="list-fruit-container">
      <h1>Shop</h1>
      <form>
        <input type="text" onBlur={this.handleChange}/>
        <button onClick={this.addNewItem}>Add</button>
      </form> 
      <table>
        <thead>
            <tr>
              <th>#</th>
              <th className="name-list-item">item</th>
              <th>button</th>
            </tr>
        </thead>
        <tbody>
          {     
          this.state.fruit.map((elem,index) => {
            return(
            <tr key={index}>
              <td>{index +1}</td>
              <td className="name-list-item" >{elem}</td>
              <td><button keyes={index+1} typename={elem} onClick={this.deleteItem}>remove</button></td>
            </tr>);
          })
          } 
          </tbody>
        </table>
    </div>
    );
  }
}

export default List;