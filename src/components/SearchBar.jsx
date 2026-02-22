import { useEffect, useRef, useState } from 'react';

export const SearchBar = ({ getWeather, getWeatherForecast }) => {

    const [inputText, setInputText] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    })

    const handleSearchClick = () => {
        if (inputText === "") return;
        getWeather(inputText);
        getWeatherForecast(inputText);
        setInputText("");
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="都市名を入力 (例: 東京都)"
            />
            <button onClick={() => handleSearchClick()}>検索</button>
        </div>
    );
}