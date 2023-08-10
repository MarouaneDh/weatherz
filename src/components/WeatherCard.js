import { useEffect } from 'react'
import './WeatherCard.css'

const WeatherCard = ({ error, iconUrl, continant, city, country, dayWeather, temps, currentWeather }) => {

    const address = localStorage.getItem('address')
    const bigImage = localStorage.getItem('bigImage')
    const currentTemp = localStorage.getItem('currentTemp')
    const smallIcon = localStorage.getItem('smallIcon')
    const averageDayWeather = localStorage.getItem('averageDayWeather')
    const currentDayWeather = localStorage.getItem('currentDayWeather')
    const minAverage = localStorage.getItem('minAverage')
    const maxAverage = localStorage.getItem('maxAverage')

    const saveData = () => {
        localStorage.setItem('address', `${city}, ${country}, ${continant}`)
        localStorage.setItem('bigImage', makeWeatherIcon(currentWeather?.WeatherIcon))
        localStorage.setItem('currentTemp', `${currentWeather?.Temperature.Metric.Value} °${currentWeather?.Temperature.Metric.Unit}`)
        localStorage.setItem('smallIcon', iconUrl)
        localStorage.setItem('averageDayWeather', dayWeather)
        localStorage.setItem('currentDayWeather', currentWeather?.WeatherText)
        localStorage.setItem('minAverage', `${temps.Minimum.Value} °${temps.Minimum.Unit}`)
        localStorage.setItem('maxAverage', `${temps.Maximum.Value} °${temps.Maximum.Unit}`)
    }

    const makeWeatherIcon = (id) => {
        return id < 10 ? `https://developer.accuweather.com/sites/default/files/0${id}-s.png` :
            `https://developer.accuweather.com/sites/default/files/${id}-s.png`
    }

    useEffect(() => {
        if (!error) {
            saveData()
        }
    }, [error])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="cardContainer">
            <div className="card">
                <p className="city">{address}</p>
                <div className='weather'>
                    <img src={bigImage} alt='weather-icon' />
                    <p className="weather">{currentDayWeather}</p>
                </div>
                <p className="temp">{currentTemp}</p>
                <div className='average-container'>
                    <img className="smallImg" src={smallIcon} alt='weather-icon' />
                    <div className='average'>
                        <p className="small-weather">{averageDayWeather}</p>
                        <div className="minmaxContainer">
                            <div className="min">
                                <p className="minHeading">Min</p>
                                <p className="minTemp">{minAverage}</p>
                            </div>
                            <div className="max"><p className="maxHeading">Max</p>
                                <p className="maxTemp">{maxAverage}</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherCard