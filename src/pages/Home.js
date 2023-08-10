import React, { useEffect, useState } from 'react'
import { gettingCurrentWeather, gettingWeather, searchCity } from '../controllers/controllers'
import WeatherCard from '../components/WeatherCard'

const Home = () => {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [city, setCity] = useState(null)
    const [weather, setWeather] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [error503, setError503] = useState(true)

    const makeWeatherIcon = (id) => {
        return id < 10 ? `https://developer.accuweather.com/sites/default/files/0${id}-s.png` :
            `https://developer.accuweather.com/sites/default/files/${id}-s.png`
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude)
            setLng(longitude)
        }

        function error() {
            console.log("Unable to retrieve your location");
        }
    }, [])

    useEffect(() => {
        const getCity = async () => {
            try {
                const cityData = await searchCity(lat, lng)
                setCity(cityData)
            } catch (error) {
                console.log(error)
            }
        }
        getCity()
    }, [lat, lng])

    useEffect(() => {
        if (city) {
            const getWeather = async () => {
                try {
                    const cityWeather = await gettingWeather(city.Key)
                    setWeather(cityWeather)
                } catch (error) {
                    console.log(error)
                }
            }
            getWeather()
        }
    }, [city])

    useEffect(() => {
        if (city) {
            const getCurrentWeather = async () => {
                try {
                    const weather = await gettingCurrentWeather(city.Key)
                    setCurrentWeather(weather)
                } catch (error) {
                    console.log(error)
                }
            }
            getCurrentWeather()
        }
    }, [city])

    useEffect(() => {
        if (city) {
            setError503(false)
        }
    }, [city])


    return (
        weather && currentWeather && <div>
            <WeatherCard error={error503} continant={city.Region.LocalizedName} country={city.Country.EnglishName} city={city.AdministrativeArea.LocalizedName} iconUrl={makeWeatherIcon(weather.DailyForecasts[0].Day?.Icon)} dayWeather={weather.DailyForecasts[0].Day?.LongPhrase} temps={weather.DailyForecasts[0].Temperature} currentWeather={currentWeather} />
        </div>
    )
}

export default Home