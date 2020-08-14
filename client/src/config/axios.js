import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban8-dcbon.herokuapp.com'
})

export default instance