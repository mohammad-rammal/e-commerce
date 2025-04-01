import axios from 'axios';

const baseUrl = axios.create({baseUrl: 'http://localhost:5000'});

export default baseUrl;
