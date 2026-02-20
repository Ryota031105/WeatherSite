import { useState, useEffect } from 'react';
import { fetchWeather, fetchWeatherByCoordinate } from './lib/weatherApi';
import { SearchBar } from './components/SearchBar'; // 子コンポーネントを読み込む

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: (Math.round(position.coords.latitude * 10000) / 10000),
          lng: (Math.round(position.coords.longitude * 10000) / 10000),
        });
      }
    );
  }, []);

  useEffect(() => {
    const getCurrentWeather = async (location) => {
      try {
        const data = await fetchWeatherByCoordinate(location);
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
      const data = await fetchWeather(cityName);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error("天気の取得に失敗しました", error);
      setError("都市が見つかりませんでした");
      setWeatherData(null);
    }
  };

  return (
    <div>
      <SearchBar onSearch={getWeather} />
      {weatherData && <div>
        <h2>{weatherData.displayLocation}の天気</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="天気アイコン"
        />
        <p>状態: {weatherData.weather[0].main}</p>
        <p>気温: {weatherData.main.temp} ℃</p>
        <p>湿度: {weatherData.main.humidity} %</p>
      </div>}
      {error && <p>{error}</p>}
    </div>
  );
}
