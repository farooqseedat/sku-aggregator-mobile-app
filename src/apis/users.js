import axios from 'axios';

export default axios.create({
  baseURL: 'https://sku-aggregator.herokuapp.com',
});
