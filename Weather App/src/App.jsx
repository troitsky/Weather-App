import { useState, useEffect } from 'react'
import './App.css'
import SidePanel from './components/SidePanel'
import DayWeatherCard from './components/DayWeatherCard'
import getWindDirection from './utilities/getWindDirection'
import getConvertedDateObject from './utilities/getConvertedDateObject'
import TodaysHighlightsCards from './components/TodaysHighlightsCards'
import UnitButton from './components/UnitButton'

function App() {

  const defaultLocation = {
    name: 'Moscow', 
    lat: 55.7522,
    lon: 37.6156, 
  }

  const [location, setLocation] = useState(defaultLocation)
  const [weatherData, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [searchClosed, setSearchClosed] = useState(true);
  const [locationInput, setLocationInput] = useState(null);


  useEffect(() => {
    getWeatherData(location.lat, location.lon, units)
  }, [location, units])

  //set time  parameters from date object
  let {weekDay, date, month} = getConvertedDateObject();
  
  // Declare and set weather parameters if it has been alreday fetched
  let currentWeatherIcon, currentTemp, currentWeatherDesc, fiveDayWeather, windSpeed, wind_deg, wind_direction, humidity, pressure, visibility, temp_unit, wind_speed_unit;

  if (weatherData) {
    currentTemp = Math.floor(weatherData.current.temp) ;
    currentWeatherIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`;
    currentWeatherDesc = weatherData.current.weather[0].main;
    fiveDayWeather = weatherData.daily.slice(1,6);
    windSpeed = Math.round(weatherData.current.wind_speed);
    wind_deg = weatherData.current.wind_deg;
    wind_direction = getWindDirection(wind_deg);
    humidity =  weatherData.current.humidity;
    pressure =  weatherData.current.pressure;
    visibility =  weatherData.current.visibility/1000;
  }

  //set display units
  if (units === 'metric') {
    temp_unit = '°C',
    wind_speed_unit = 'm/s'
  }
  
  if (units === 'imperial') {
    temp_unit = '°F',
    wind_speed_unit = 'mph'
  }

 

  async function getWeatherData(lat, lon, units) {
    const res = await fetch(`/mock_api_data_${units}.json`)
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=69644e28c6a9c6d7c04f95ff1035a799&units=${units}&exclude=alerts,minutely,hourly`)
    const data = await res.json();
    setWeather(data)
  }


  return (
    <div className="App">

      <SidePanel 
        searchClosed = {searchClosed}
        currentWeatherIcon = {currentWeatherIcon}
        currentTemp = {currentTemp}
        temp_unit = {temp_unit}
        currentWeatherDesc = {currentWeatherDesc}
        weekDay = {weekDay}
        date = {date}
        month = {month}
        location = {location}
        locationInput = {locationInput}
        setLocationInput = {setLocationInput}
        setSearchClosed = {setSearchClosed}
        setLocation = {setLocation}
      />

      <main className="weather_details">
        <div className="main_container">

          <div className="unit_selection_btns">
            <UnitButton 
              unitType = "metric" 
              setUnits={setUnits}
              selectedUnits = {units}
            />

            <UnitButton 
              unitType = "imperial" 
              setUnits={setUnits}
              selectedUnits = {units}
            />

          </div>

          <div className="five_days_forecast_part">

            {fiveDayWeather && fiveDayWeather.map(day =>
             <DayWeatherCard 
              day = {day} 
              temp_unit = {temp_unit} 
            />)}

          </div>

          <TodaysHighlightsCards 
            windSpeed = {windSpeed}
            wind_speed_unit = {wind_speed_unit}
            wind_deg = {wind_deg}
            wind_direction = {wind_direction}
            humidity = {humidity}
            pressure = {pressure}
            visibility = {visibility}
          />

          </div>
      </main>
    </div>
  )
}

export default App
