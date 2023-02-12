import axios from "axios";

const getByCity = (city) => {
    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`).then(response => response.data)
}

export default {getByCity}
