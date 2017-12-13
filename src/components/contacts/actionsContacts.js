'use strict'
import axios from 'axios';

export default {
	addItem(items, inputValue){
		debugger;
		console.log("here")
	    var itemArray = items;
	    if (inputValue !== "") {
	    itemArray.push({
	        text: inputValue,
	        key: Date.now()
	      });}
	  return itemArray;
  	},
  	deleteItem(key, items) {
	  var filteredItems = items.filter(function (item) {
	  	console.log(item);
	    return (item.id !== key);
	  });
	 return filteredItems;
	}
}