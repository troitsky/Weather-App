import { useState } from 'react'


export default function SidePanel ({
    searchClosed,
    currentWeatherIcon,
    currentTemp,
    temp_unit,
    currentWeatherDesc,
    weekDay,
    date,
    month,
    location,
    locationInput,
    setLocationInput,
    updateLocation,
    setSearchClosed,
    setLocation,
    }) 
{

const [searchResults, setSearchResults] = useState([]);

async function searchLocation()  {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}}&limit=10&appid=9ee88e04f6e45307c78b6058c26e8c0a`)
  const data = await res.json();

  setSearchResults(data.map(location => {
    return {
      locName: location.name, 
      lat: location.lat, 
      lon: location.lon, 
      country: location.country, 
      state: location.state
    }
  }))
  console.log(searchResults)
}

function updateLocation(loc)  {
  console.log('update location triggered')
  console.log(loc)
  setLocation({name: loc.locName, lat: loc.lat, lon: loc.lon}); 
  setSearchClosed(true);
}

async function searchLocationNameByCoords(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=9ee88e04f6e45307c78b6058c26e8c0a`)
  const data = await res.json();
  const cityName = data[0].name;

  return cityName
}

async function getCurrentLocation() {

  let newLat, newLon, newName;

  async function findCityAndUpdateLocation(position) {
    newLat = position.coords.latitude;
    newLon = position.coords.longitude;
    newName = await searchLocationNameByCoords(newLat, newLon)

    updateLocation({
      locName: newName,
      lat: newLat,
      lon: newLon
    })

  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findCityAndUpdateLocation);
    
  } else {
    console.log("Location detection not supprted")
  }
}

function toggleSidePanel() {
  setSearchClosed(prev => !prev);
}

return (
    
    <div className="side_panel">

        {searchClosed ? 
          <>
            <div className='side_top_section'>
              <button className="btn_search_location" onClick={toggleSidePanel}>Seach for places</button>
              <button className="btn_circle get_user_location" onClick={getCurrentLocation}><span className="material-symbols-outlined">my_location</span></button>
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
                
                    <li className="search_result" onClick={() => updateLocation(loc)}>{loc.locName},{loc.state && ` ${loc.state},`} {loc.country}<span class="material-symbols-outlined">navigate_next</span></li>
                  
                )
              }
              
              
            </ul> 
          </>
        }
      </div>
)

}