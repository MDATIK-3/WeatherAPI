import { useState, useEffect } from "react";

const useWeather = () => {
    const [weatherData, setWeatherData] = useState({
        location: "",
        climate: "",
        temperature: "",
        maxTemperature: "",
        minTemperature: "",
        humidity: "",
        cloudPercentage: "",
        wind: "",
        time: "",
        longitute: "",
        latitude: ""
    });
    const [loading, setLoading] = useState({
        state: false,
        message: ""
    });
    const [error, setError] = useState(null);

    const fetchWeather = async (latitude, longitude) => {
        try {
            setLoading({
                ...loading,
                state: true,
                message: "Fetching Weather Data..."
            })

            const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);

            if (!respone.ok) {
                const errorMessage = `Fetch weather data failed: ${Response.state}`
                throw new Error(errorMessage);
            }

            const data = await respone.json();

            const updateWeatherData = {
                ...weatherData,
                location: data?.name,
                climate: data?.weather[0].main,
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,
                time: data?.dt,
                longitute: longitude,
                latitude: latitude,
            }
            setWeatherData(updateWeatherData);

        } catch (err) {
            setError(err);
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: ""
            })
        }
    }

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: "Finding Location..."
        })
        navigator.geolocation.getCurrentPosition((position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        })
    }, [])

    return { weatherData, loading, error };

}

export default useWeather;