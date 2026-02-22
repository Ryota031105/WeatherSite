import { ForecastItem } from "./ForecastItem"

export const ForecastList = ({ forecastData }) => {
    return (
        <>
            {forecastData && forecastData.list.map((data, index) => {
                if ((index % 8 === 7)) {
                    return (
                        <>
                            <span>{data.dt_txt.slice(8, 10)} </span>
                            <ForecastItem data={data} />
                            <br />
                        </>
                    )
                } else if (index % 8 === 0) {
                    return (
                        <>
                            <span>{data.dt_txt.slice(8, 10)}日 </span>
                            <ForecastItem data={data} />
                        </>
                    )
                } else {
                    return <ForecastItem data={data} />
                }
            })}
        </>
    )
}