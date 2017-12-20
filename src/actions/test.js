'use strict'

import axios from 'axios';

export const Test = {
  a(param) {
    return axios({
      method: 'get',
      url: `https://wristo-platform-backend-stg.herokuapp.com/api/v1/wearers/${param}/groups`,
      headers: {'X-Requested-With': 'XMLHttpRequest', 'accept': 'application/json', 'content-type': 'application/json', 
      'uid': 'boretskairuna23@gmail.com', 'client': 'ldhWd6MKE0QI-pn39bcuag', 'access-token': 'NOoEY1SGJa_Sy_TVwq_jYA'},
      responseType: 'json'
    }).then(resp => resp, err => console.log(error))
  },

}