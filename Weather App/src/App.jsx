import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState('Moscow')
  const [weatherData, setWeather] = useState(null)

  useEffect(() => {
    getWeatherData()
  }, [])

  // utilities
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  const currentDate = new Date();
  let weekDay = weekdays[currentDate.getDay()];
  let  date = currentDate.getDate()
  let month = months[currentDate.getMonth()];

  async function getWeatherData() {
    const res = await fetch("/mock_api_data.json")
    const data = await res.json();
    setWeather(data)
  }

  let currentWeatherIcon, currentTemp, currentWeatherDesc;

  if (weatherData) {
    currentTemp = Math.floor(weatherData.current.temp) ;
    currentWeatherIcon = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`;
    currentWeatherDesc = weatherData.current.weather[0].main;
    console.log(currentWeatherIcon)
  }

  return (
    <div className="App">
      <div className="side_panel">

        {/* side panel info mode (deafult) */}
        <div className='side_top_section'>
          <button className="btn_search_location">Seach for places</button>
          <button className="btn_circle get_user_location"><span className="material-symbols-outlined">my_location</span></button>
        </div>
        <div className='weather_illustration_part'>
          <img src='/Cloud-background.png' className="weather_illustration_bg" alt="" />
          <img src={currentWeatherIcon} alt="" className="weather_illustration_img" />
        </div>
        <p className="temprature_figure">{currentTemp}<span className='temp_unit'>°C</span></p>
        <p className="weather_description">{currentWeatherDesc}</p>
        <div className="side_lower_date">
          <p className='displayed_weather_day'>Today</p>
          <span className='date_divider'>•</span>
          <p className='displayed_weather_date'>{weekDay}, {date} {month}</p>
        </div>
        <p className="displayed_weather_location"><span className="material-symbols-outlined">location_on</span>{location}</p>

      {/* side panel info mode (search mode) */}
      {/* <span class="side_close_icon material-symbols-outlined">close</span>
      <div className='side_top_search_section'>
          <span class="search_icon material-symbols-outlined">search</span>
          <input type="text" className='location_input' placeholder='search for places' />
          <button className="btn_search">Search</button>
      </div>
      <ul className="search_results">
        <li className="search_result">london<span class="material-symbols-outlined">navigate_next</span></li>
        <li className="search_result">london<span class="material-symbols-outlined">navigate_next</span></li>
        <li className="search_result">london<span class="material-symbols-outlined">navigate_next</span></li>
      </ul> */}

      </div>

      

      <main className="weather_details">
        <div className="main_container">
          <div className="unit_selection_btns">
            <button className='btn_circle btn_unit_selection'>°C</button>
            <button className='btn_circle btn_unit_selection'>°F</button>
          </div>
          <div className="five_days_forecast_part">
            <div className="weather_sm_card">
              <p className="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" className='forecast_sm_img'/>
              <div className="forecast_minmax">
                <p className="forecast_max_temp">16°C</p>
                <p className="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div className="weather_sm_card">
              <p className="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" className='forecast_sm_img'/>
              <div className="forecast_minmax">
                <p className="forecast_max_temp">16°C</p>
                <p className="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div className="weather_sm_card">
              <p className="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" className='forecast_sm_img'/>
              <div className="forecast_minmax">
                <p className="forecast_max_temp">16°C</p>
                <p className="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div className="weather_sm_card">
              <p className="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" className='forecast_sm_img'/>
              <div className="forecast_minmax">
                <p className="forecast_max_temp">16°C</p>
                <p className="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div className="weather_sm_card">
              <p className="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" className='forecast_sm_img'/>
              <div className="forecast_minmax">
                <p className="forecast_max_temp">16°C</p>
                <p className="forecast_min_temp">11°C</p>
              </div>
            </div>
          </div>
            <h3 className='weather_highlights_title'>Today’s Hightlights</h3>
            <div className="weather_highlights_part">
              
              <div className="highligt_card">
                <p className="highlight_title">Wind status</p>
                <p className="highlight_figure">7<span className='highlight_unit'>mph</span></p>
                <div className="wind_direction_part">
                  <div className="wind_direction_bg">
                  <span className="material-symbols-outlined">navigation</span>
                  </div>
                  <p className='wind_direction_text'>WSW</p>
                </div>
              </div>
              
              <div className="highligt_card">
                <p className="highlight_title">Humidity</p>
                <p className="highlight_figure">84<span className='highlight_unit'>%</span></p>
                <div className="humidity_meter_part">
                  <div className="markers_row">
                    <p className='humidity_value_marker'>0</p>
                    <p className='humidity_value_marker'>50</p>
                    <p className='humidity_value_marker'>100</p>
                  </div>                 
                  <div className="humidity_meter_bar"></div>
                  <div className="humidity_meter_bg"></div>
                  <span className='humidity_value_unit'>%</span>
                </div>
              </div>

              <div className="highligt_card">
                <p className="highlight_title">Air pressure</p>
                <p className="highlight_figure">998<span className='highlight_unit'>mb</span></p>
              </div>

              <div className="highligt_card">
                <p className="highlight_title">Visibility</p>
                <p className="highlight_figure">6,4 <span className='highlight_unit'>miles</span></p>
              </div>

            </div>
          </div>
      </main>
    </div>
  )
}

export default App
