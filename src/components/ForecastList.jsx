import { ForecastItem } from "./ForecastItem"
import styles from './ForecastList.module.css'

export const ForecastList = ({ forecastData }) => {
    return (
        <>
            <div className={styles.item}>
                {forecastData && <>
                    <div className={styles.timeAll}>
                        <span>予報</span>
                        <span className={styles.time}>0</span>
                        <span className={styles.time}>3</span>
                        <span className={styles.time}>6</span>
                        <span className={styles.time}>9</span>
                        <span className={styles.time}>12</span>
                        <span className={styles.time}>15</span>
                        <span className={styles.time}>18</span>
                        <span className={styles.time}>21</span>
                    </div>
                    <div className={styles.test}>
                        <p className={styles.dayFont}>{forecastData.list[0].dt_txt.slice(8, 10)}日</p>
                        {forecastData.list.slice(0, 8).map((data, index) => {
                            return <ForecastItem key={index} data={data} />
                        })}
                    </div>
                    <div className={styles.test}>
                        <p className={styles.dayFont}>{forecastData.list[8].dt_txt.slice(8, 10)}日</p>
                        {forecastData.list.slice(8, 16).map((data, index) => {
                            return <ForecastItem key={index} data={data} />
                        })}
                    </div>
                    <div className={styles.test}>
                        <p className={styles.dayFont}>{forecastData.list[16].dt_txt.slice(8, 10)}日</p>
                        {forecastData.list.slice(16, 24).map((data, index) => {
                            return <ForecastItem key={index} data={data} />
                        })}
                    </div>
                    <div className={styles.test}>
                        <p className={styles.dayFont}>{forecastData.list[24].dt_txt.slice(8, 10)}日</p>
                        {forecastData.list.slice(24, 32).map((data, index) => {
                            return <ForecastItem key={index} data={data} />
                        })}
                    </div>
                    <div className={styles.test}>
                        <p className={styles.dayFont}>{forecastData.list[32].dt_txt.slice(8, 10)}日</p>
                        {forecastData.list.slice(32, 40).map((data, index) => {
                            return <ForecastItem key={index} data={data} />
                        })}
                    </div>
                </>}
            </div>
        </>
    )
}