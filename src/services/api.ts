import axios from 'axios'

const serverApi = axios.create({
  baseURL: "http://localhost:3333",
});

export default serverApi;