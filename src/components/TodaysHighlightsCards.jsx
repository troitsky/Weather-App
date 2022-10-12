export default function TodaysHighlightsCards({
  windSpeed,
  wind_speed_unit,
  wind_deg,
  wind_direction,
  humidity,
  pressure,
  visibility
}) {
    return (
        <>
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
        </>
    )
}