import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="App">
      <div class="side_panel">
        <div class='side_top_section'>
          <button class="btn_search_location">Seach for places</button>
          <button class="btn_circle get_user_location"><span class="material-symbols-outlined">my_location</span></button>
        </div>
        <div class='weather_illustration_part'>
          <img src="Cloud-background.png" class="weather_illustration_bg" alt="" />
          <img src="/HeavyRain.png" alt="" class="weather_illustration_img" />
        </div>
        <p class="temprature_figure">15<span class='temp_unit'>°C</span></p>
        <p class="weather_description">Shower</p>
        <div class="side_lower_date">
          <p class='displayed_weather_day'>Today</p>
          <span className='date_divider'>•</span>
          <p class='displayed_weather_date'>Fri, 5 Jun</p>
        </div>
        <p class="displayed_weather_location"><span class="material-symbols-outlined">location_on</span>Helsinki</p>
      </div>
      <main class="weather_details">
        <div class="main_container">
          <div class="unit_selection_btns">
            <button class='btn_circle btn_unit_selection'>°C</button>
            <button class='btn_circle btn_unit_selection'>°F</button>
          </div>
          <div class="five_days_forecast_part">
            <div class="weather_sm_card">
              <p class="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" class='forecast_sm_img'/>
              <div class="forecast_minmax">
                <p class="forecast_max_temp">16°C</p>
                <p class="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div class="weather_sm_card">
              <p class="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" class='forecast_sm_img'/>
              <div class="forecast_minmax">
                <p class="forecast_max_temp">16°C</p>
                <p class="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div class="weather_sm_card">
              <p class="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" class='forecast_sm_img'/>
              <div class="forecast_minmax">
                <p class="forecast_max_temp">16°C</p>
                <p class="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div class="weather_sm_card">
              <p class="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" class='forecast_sm_img'/>
              <div class="forecast_minmax">
                <p class="forecast_max_temp">16°C</p>
                <p class="forecast_min_temp">11°C</p>
              </div>
            </div>
            <div class="weather_sm_card">
              <p class="forecast_day">Sun, 7 Jun</p>
              <img src="/LightRain.png" alt="" class='forecast_sm_img'/>
              <div class="forecast_minmax">
                <p class="forecast_max_temp">16°C</p>
                <p class="forecast_min_temp">11°C</p>
              </div>
            </div>
          </div>
            <h3 class='weather_highlights_title'>Today’s Hightlights</h3>
            <div class="weather_highlights_part">
              
              <div class="highligt_card">
                <p class="highlight_title">Wind status</p>
                <p class="highlight_figure">7<span class='highlight_unit'>mph</span></p>
                <div class="wind_direction_part">
                  <div class="wind_direction_bg">
                  <span class="material-symbols-outlined">navigation</span>
                  </div>
                  <p class='wind_direction_text'></p>
                </div>
              </div>
              
              <div class="highligt_card">
                <p class="highlight_title">Humidity</p>
                <p class="highlight_figure">84<span class='highlight_unit'>%</span></p>
                <div class="humidity_meter_part">
                  <span class='humidity_value_marker'>0</span>
                  <span class='humidity_value_marker'>50</span>
                  <span class='humidity_value_marker'>100</span>
                  <div class="humidity_meter_bar"></div>
                  <div class="humidity_meter_bg"></div>
                  <span class='humidity_value_unit'>%</span>
                </div>
              </div>

              <div class="highligt_card">
                <p class="highlight_title">Air pressure</p>
                <p class="highlight_figure">998<span class='highlight_unit'>mb</span></p>
              </div>

              <div class="highligt_card">
                <p class="highlight_title">Visibility</p>
                <p class="highlight_figure">6<span class='highlight_unit'>miles</span></p>
              </div>

            </div>
          </div>
      </main>
    </div>
  )
}

export default App
