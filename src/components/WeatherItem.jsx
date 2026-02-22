import styles from './WeatherItem.module.css';

export const WeatherItem = ({ weatherData, error }) => {
    const changeLan = (data) => {
        switch (data) {
            case "Clear": return "晴れ";
            case "Clouds": return "くもり";
            case "Rain": return "雨";
            case "Snow": return "雪";
            default: return data;
        }
    }

    return (
        <>
            {weatherData && <div>
                <p>{weatherData.displayLocation}</p>
                <p>{weatherData.main.temp} ℃ | 湿度: {weatherData.main.humidity} %</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="天気アイコン"
                />
                <hr />
            </div>}
            {error && <p>{error}</p>}
        </>
    )
}