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
        longitude: "",
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
                state: true,
                message: "Fetching Weather Data..."
            });

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
            );

            if (!response.ok) {
                const errorMessage = `Fetch weather data failed: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();

            setWeatherData({
                location: data?.name,
                climate: data?.weather[0].main,
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,
                time: data?.dt,
                longitude,
                latitude
            });

        } catch (err) {
            setError(err);
        } finally {
            setLoading({
                state: false,
                message: ""
            });
        }
    };

    useEffect(() => {
        setLoading({
            state: true,
            message: "Finding Location..."
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (geoError) => {
                setError(geoError);
                setLoading({ state: false, message: "" });
            }
        );
    }, []);

    return { weatherData, loading, error };
};

export default useWeather;
