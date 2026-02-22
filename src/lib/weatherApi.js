// src/lib/weatherApi.js

export const feachLocation = async (address) => {
    const geoResponse = await fetch(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${address}`);
    if (!geoResponse.ok) throw new Error("住所検索に失敗しました");

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
        throw new Error("指定された住所が見つかりませんでした");
    }

    return { lng: geoData[0].geometry.coordinates[0], lat: geoData[0].geometry.coordinates[1], locationName: geoData[0].properties.title };

}

export const fetchWeather = async (location) => {
    const APIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const lat = location.lat;
    const lon = location.lng;
    const locationName = location.locationName;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=ja`
    );

    if (!weatherResponse.ok) throw new Error("天気の取得に失敗しました");

    console.log("天気の取得に成功しました");

    const weatherData = await weatherResponse.json();

    return { ...weatherData, displayLocation: locationName };
};

export const fetchWeatherForecast = async (location) => {
    const APIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const lat = location.lat;
    const lon = location.lng;

    const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=ja`
    );

    if (!forecastResponse.ok) throw new Error("天気予報の取得に失敗しました");

    console.log("天気予報の取得に成功しました");

    const forecastData = await forecastResponse.json();

    return { ...forecastData };
};