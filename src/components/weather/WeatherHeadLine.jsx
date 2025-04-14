import { useContext } from "react";
import cloude from "../../assets/cloud.svg";
import HazeIcon from "../../assets/haze.svg";
import span from "../../assets/pin.svg";
import { WeatherContext } from "../../context";
import { getFormattedDate } from "../../utils/date-util";

function WeatherHeadLine() {
  const { weatherData } = useContext(WeatherContext);
  const { temperature, location, time, climate } = weatherData;

  function getWeatherIcon(weather) {
    switch (weather) {
      case "Sunny":
        return SunnyIcon;
      case "Cloudy":
        return cloude;
      case "Hazy":
        return HazeIcon;
      case "Rainy":
        return RainIcon;
      case "Snowy":
        return SnowIcon;
      default:
        return HazeIcon;
    }
  }

  return (
    <div>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getWeatherIcon(climate)} alt="cloud" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {Math.round(temperature)}°
          </h1>
          <div className="flex items-center space-x-4 md:mb-4">
            <img src={span} />
            <h2 className="text-2xl lg:text-[50px]">{location}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm lg:text-lg">
        {getFormattedDate(time, "time", false)} -{" "}
        {getFormattedDate(time, "date", false)}
      </p>
    </div>
  );
}

export default WeatherHeadLine;
