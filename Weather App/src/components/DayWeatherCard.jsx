import getConvertedDateObject from '../utilities/getConvertedDateObject'

export default function DayWeatherCard({day, temp_unit}) {
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
}