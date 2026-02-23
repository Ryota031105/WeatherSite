import { useEffect, useRef, useState } from 'react';
import styles from "./SearchBar.module.css"

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
        <div className={styles.search}>
            <input
                className={styles.searchBar}
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="都市名を入力 (例: 東京都)"
            />
            <button className={styles.searchButton} onClick={() => handleSearchClick()}>検索</button>
        </div>
    );
}