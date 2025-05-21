import axios from 'axios';

const API = axios.create({
  baseURL: 'http://waratel-env.eba-ehdafa3g.eu-north-1.elasticbeanstalk.com/api/v1', 
});

export default API;
