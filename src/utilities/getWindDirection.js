export default function getWindDirection(d) {
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