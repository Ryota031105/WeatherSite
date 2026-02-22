import { useState, useEffect } from 'react';
import { feachLocation, fetchWeather, fetchWeatherForecast } from './lib/weatherApi';
import { SearchBar } from './components/SearchBar'; // 子コンポーネントを読み込む
import { WeatherItem } from './components/WeatherItem';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: (Math.round(position.coords.latitude * 10000) / 10000),
          lng: (Math.round(position.coords.longitude * 10000) / 10000),
          locationName: "現在地",
        });
      }
    );
  }, []);

  useEffect(() => {
    const getCurrentWeather = async (location) => {
      try {
        const data = await fetchWeather(location);
        const forecast = await fetchWeatherForecast(location);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error("天気の取得に失敗しました", error);
        setError("都市が見つかりませんでした");
        setWeatherData(null);
      }
    };
    getCurrentWeather(location);
  }, [location]);


  // 子に渡すための関数（APIを叩いてStateを更新するロジック）
  const getWeather = async (cityName) => {
    try {
      const coordinate = await feachLocation(cityName);
      const data = await fetchWeather(coordinate);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error("天気の取得に失敗しました", error);
      setError("都市が見つかりませんでした");
      setWeatherData(null);
    }
  };

  const getWeatherForecast = async (cityName) => {
    try {
      const coordinate = await feachLocation(cityName);
      const data = await fetchWeatherForecast(coordinate);
      setForecastData(data);
      setError(null);
    } catch (error) {
      console.error("天気の取得に失敗しました", error);
      setError("都市が見つかりませんでした");
      setForecastData(null);
    }
  };

  return (
    <div>
      <SearchBar getWeather={getWeather} getWeatherForecast={getWeatherForecast} />
      <WeatherItem weatherData={weatherData} error={error} />
    </div>
  );
}
