import axios from "axios";

const baseUrl = 'http:/localhost:3001'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)
