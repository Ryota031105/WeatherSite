export const ForecastItem = ({ data }) => {
    return (
        <>
            <span>{data.main.temp}℃ </span>
        </>
    )
}