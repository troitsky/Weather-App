import { useState, useEffect } from 'react'
import './App.css'
import DayWeatherCard from './components/DayWeatherCard'

function App() {
  const [location, setLocation] = useState(
    {name: 'Moscow', 
    lat: 55.7522,
    lon: 37.6156, 
    country: 'Ru'}
  )
  const [weatherData, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [searchClosed, setSearchClosed] = useState(true);
  const [locationInput, setLocationInput] = useState(null);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    getWeatherData(location.lat, location.lon, units)
  }, [location, units])

  // utilities
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function getWindDirection(d) {
    let WIND_DIRECTION;
    switch (true) {
        case 0 :
        case 360:
            WIND_DIRECTION = "N";
        break;
        case 90 :
            WIND_DIRECTION = "E";
        break;
        case 180 :
            WIND_DIRECTION = "S";
        break;
        case 270 :
            WIND_DIRECTION = "W";
        break;
        case (d>0 && d<90) :
            WIND_DIRECTION = "NE";
        break;
        case (d>90 && d<180) :
            WIND_DIRECTION = "SE";
        break;
        case (d>180 && d<270) :
            WIND_DIRECTION = "SW";
        break;
        case (d>270 && d<360) :
            WIND_DIRECTION = "NW";
        break;
        default:
            WIND_DIRECTION = "-";
            break;
    }

    return WIND_DIRECTION;
  } 

  let temp_unit, wind_speed_unit;

  if (units === 'metric') {
    temp_unit = '°C',
    wind_speed_unit = 'kph'
  }
  
  if (units === 'imperial') {
    temp_unit = '°F',
    wind_speed_unit = 'mph'
  }


  let {weekDay, date, month} = getConvertedDateObject()

  function getConvertedDateObject(unixDate = null) {
      let date = {}
      if (unixDate) {
        date.fullDate = new Date(unixDate * 1000)
      } else {
        date.fullDate = new Date();
      }

      date.weekDay = weekdays[date.fullDate.getDay()];
      date.date = date.fullDate.getDate()
      date.month = months[date.fullDate.getMonth()];

      return date;
  }

  async function getWeatherData(lat, lon, units) {
    // const res = await fetch(`/mock_api_data_${units}.json`)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=69644e28c6a9c6d7c04f95ff1035a799&units=${units}&exclude=alerts,minutely,hourly`)
    const data = await res.json();
    console.log(data)
    setWeather(data)
  }

  let currentWeatherIcon, currentTemp, currentWeatherDesc, fiveDayWeather, windSpeed, wind_deg, wind_direction, humidity, pressure, visibility;
  ;

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

  function toggleSidePanel() {
    setSearchClosed(prev => !prev);
  }

  async function searchLocation()  {
    
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}}&limit=10&appid=9ee88e04f6e45307c78b6058c26e8c0a`)
    
    const data = await res.json();
    console.log(data)

    setSearchResults(data.map(location => {
      return {locName: location.name, lat: location.lat, lon: location.lon, country: location.country, state: location.state}
    }))
    console.log(searchResults)
  }

  return (
    <div className="App">
      <div className="side_panel">

        {searchClosed ? 
          <>
            <div className='side_top_section'>
              <button className="btn_search_location" onClick={toggleSidePanel}>Seach for places</button>
              <button className="btn_circle get_user_location"><span className="material-symbols-outlined">my_location</span></button>
            </div>
            <div className='weather_illustration_part'>
              <img src='/Cloud-background.png' className="weather_illustration_bg" alt="" />
              <img src={currentWeatherIcon} alt="" className="weather_illustration_img" />
            </div>
            <p className="temprature_figure">{currentTemp}<span className='temp_unit'>{temp_unit}</span></p>
            <p className="weather_description">{currentWeatherDesc}</p>
            <div className="side_lower_date">
              <p className='displayed_weather_day'>Today</p>
              <span className='date_divider'>•</span>
              <p className='displayed_weather_date'>{weekDay}, {date} {month}</p>
            </div>
            <p className="displayed_weather_location"><span className="material-symbols-outlined">location_on</span>{location.name}</p>
          </>
          :
          <>
            <span class="side_close_icon material-symbols-outlined" onClick={toggleSidePanel}>close</span>
            <div className='side_top_search_section'>
                <span class="search_icon material-symbols-outlined">search</span>
                <input type="text" className='location_input' value={locationInput} onChange={(e) => setLocationInput(e.target.value.trim())} placeholder='search for places' />
                <button className="btn_search" onClick={searchLocation}>Search</button>
            </div>
            <ul className="search_results">
              {
                searchResults && searchResults.map( 
                  loc => 
                
                    <li className="search_result" onClick={() => {setLocation({name: loc.locName, lat: loc.lat, lon: loc.lon}); setSearchClosed(true)}}>{loc.locName},{loc.state && ` ${loc.state},`} {loc.country}<span class="material-symbols-outlined">navigate_next</span></li>
                  
                )
              }
              
              
            </ul> 
          </>
        }
      </div>

      

      <main className="weather_details">
        <div className="main_container">

          <div className="unit_selection_btns">
            <button className='btn_circle btn_unit_selection' style={units === 'metric' ? { background:" #E7E7EB", color: "#110E3C"} : null} onClick={() => setUnits('metric')}>°C</button>
            <button className='btn_circle btn_unit_selection' style={units === 'imperial' ? { background:" #E7E7EB", color: "#110E3C"} : null} onClick={() => setUnits('imperial')}>°F</button>
          </div>

          <div className="five_days_forecast_part">
          
            {fiveDayWeather && fiveDayWeather.map(day => {
                
                let {weekDay, date, month} = getConvertedDateObject(day.dt)

                return (
                  <div className="weather_sm_card">
                  <p className="forecast_day">{weekDay.slice(0,3)}, {date} {month.slice(0,3)}</p>
                  <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} alt="" className='forecast_sm_img'/>
                  <div className="forecast_minmax">
                    <p className="forecast_max_temp">{Math.round(day.temp.max)}{temp_unit}</p>
                    <p className="forecast_min_temp">{Math.round(day.temp.min)}{temp_unit}</p>
                  </div>
                </div>) 
              })
            }
          </div>

            
            <h3 className='weather_highlights_title'>Today’s Hightlights</h3>
            <div className="weather_highlights_part">
              
              <div className="highligt_card">
                <p className="highlight_title">Wind status</p>
                <p className="highlight_figure">{windSpeed}<span className='highlight_unit'>{wind_speed_unit}</span></p>
                <div className="wind_direction_part">
                  <div className="wind_direction_bg">
                    <span className="material-symbols-outlined" style={{transform: `rotate(${wind_deg}deg)`}}>navigation</span>
                  </div>
                  <p className='wind_direction_text'>{wind_direction}</p>
                </div>
              </div>
              
              <div className="highligt_card">
                <p className="highlight_title">Humidity</p>
                <p className="highlight_figure">{humidity}<span className='highlight_unit'>%</span></p>
                <div className="humidity_meter_part">
                  <div className="markers_row">
                    <p className='humidity_value_marker'>0</p>
                    <p className='humidity_value_marker'>50</p>
                    <p className='humidity_value_marker'>100</p>
                  </div>                 
                  <div className="humidity_meter_bar" style={{width: `${humidity}%`}}></div>
                  <div className="humidity_meter_bg"></div>
                  <span className='humidity_value_unit'>%</span>
                </div>
              </div>

              <div className="highligt_card">
                <p className="highlight_title">Air pressure</p>
                <p className="highlight_figure">{pressure}<span className='highlight_unit'>mb</span></p>
              </div>

              <div className="highligt_card">
                <p className="highlight_title">Visibility</p>
                <p className="highlight_figure">{visibility} <span className='highlight_unit'>km</span></p>
              </div>

            </div>
          </div>
      </main>
    </div>
  )
}

export default App
