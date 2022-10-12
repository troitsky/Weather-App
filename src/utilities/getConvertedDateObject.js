const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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

export default getConvertedDateObject