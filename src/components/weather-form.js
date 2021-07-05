import Info from "./location-info"
// import useLocation from "./weather-info"

const WeatherForm = () => {
    return (
        <div className="container">
            <h3>Weather App</h3>

            <h5>{}</h5>

            {/* <div>
                <h5>{weather-show}</h5>

                <p>{weather-description}</p>

                <p>{wind-speed}</p>

                <p>{clouds}</p>

                <p>{pressure}</p>
            </div> */}

            <button onClick={Info()} >Change degrees F / C</button>
        </div>
    )
} 

export default WeatherForm