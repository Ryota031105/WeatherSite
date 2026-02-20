// src/lib/weatherApi.js

export const fetchWeather = async (address) => {
    const APIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    // 1. 国土地理院APIで住所を検索
    const geoResponse = await fetch(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${address}`);
    if (!geoResponse.ok) throw new Error("住所検索に失敗しました");

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
        throw new Error("指定された住所が見つかりませんでした");
    }

    const [lon, lat] = geoData[0].geometry.coordinates;
    const locationName = geoData[0].properties.title;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=ja`
    );

    if (!weatherResponse.ok) throw new Error("天気の取得に失敗しました");

    const weatherData = await weatherResponse.json();

    return { ...weatherData, displayLocation: locationName };
};

export const fetchWeatherByCoordinate = async (coordinate) => {
    //const APIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const locationName = "現在地"

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${APIKey}&units=metric&lang=ja`
    );

    if (!weatherResponse.ok) throw new Error("天気の取得に失敗しました");

    const weatherData = await weatherResponse.json();

    return { ...weatherData, displayLocation: locationName };
};