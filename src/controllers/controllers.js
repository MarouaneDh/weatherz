import axios from 'axios'

const API_HOST = 'https://dataservice.accuweather.com/'
const apikey = 'nZFap36Leess6JvJ0bZjspXCRTiIAE1x'

export const searchCity = async (lat, lng) => {
    try {
        const res = await axios.get(`${API_HOST}locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat}%2C${lng}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const gettingWeather = async (locationKey) => {
    try {
        const weather = await axios.get(`${API_HOST}forecasts/v1/daily/1day/${locationKey}?apikey=${apikey}&language=en-US&details=true&metric=true`)
        return weather.data
    } catch (error) {
        console.log(error)
    }
}

export const gettingCurrentWeather = async (locationKey) => {
    try {
        const weather = await axios.get(`${API_HOST}currentconditions/v1/${locationKey}?apikey=${apikey}`)
        return weather.data[0]
    } catch (error) {
        console.log(error)
    }
}
