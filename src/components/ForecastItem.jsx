import styles from './ForecastItem.module.css'

export const ForecastItem = ({ data }) => {
    return (
        <>
            <div className={styles.data}>
                <img
                    className={styles.fixedSize}
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="天気アイコン"
                />
                <br />
                <span className={styles.item}>{data.main.temp}℃ </span>
            </div>
        </>
    )
}