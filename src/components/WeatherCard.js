import './WeatherCard.css'

const WeatherCard = ({ iconUrl, continant, city, country, dayWeather, temps, currentWeather }) => {

    const makeWeatherIcon = (id) => {
        return id < 10 ? `https://developer.accuweather.com/sites/default/files/0${id}-s.png` :
            `https://developer.accuweather.com/sites/default/files/${id}-s.png`
    }

    return (
        <div className="cardContainer">
            <div className="card">
                <p className="city">{city}, {country}, {continant}</p>
                <div className='weather'>
                    <img src={makeWeatherIcon(currentWeather.WeatherIcon)} alt='weather-icon' />
                    <p className="weather">{currentWeather.WeatherText}</p>
                </div>
                <p className="temp">{currentWeather.Temperature.Metric.Value} °{currentWeather.Temperature.Metric.Unit}</p>
                <div className='average-container'>
                    <img className="smallImg" src={iconUrl} alt='weather-icon' />
                    <div className='average'>
                        <p className="small-weather">{dayWeather}</p>
                        <div className="minmaxContainer">
                            <div className="min">
                                <p className="minHeading">Min</p>
                                <p className="minTemp">{temps.Minimum.Value} °{temps.Maximum.Unit}</p>
                            </div>
                            <div className="max"><p className="maxHeading">Max</p>
                                <p className="maxTemp">{temps.Maximum.Value} °{temps.Maximum.Unit}</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherCard