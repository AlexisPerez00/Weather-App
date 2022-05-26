import { useEffect, useState } from "react"


const Info = () => {    
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: "",
            lng: ""
        }
    })
    const [data, setData] = useState({})
    const [temp, setTemp] = useState('')


    useEffect(() => {
        const success = (location) => {
             setLocation({
                loaded: true,
                coordinates: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                        }
            })  
        }

        const error = () => {
        alert('Unable to retrieve your location');
        }

        if(!navigator.geolocation) {
            alert('Your browser is not compatible with geolocation')
        }
        else {
            navigator.geolocation.getCurrentPosition(success, error)
            }
            
    },[])

    

    useEffect(() => {
        const fetchData = async() => {
        let url = `http://api.weatherapi.com/v1/current.json?key=8a88406f21734422b8504112210507&q=${location.coordinates.lat},${location.coordinates.lng}&aqi=yes`
        const response = await fetch(url).then(data => data.json())
        setData(response)
        }
        if(location.loaded){
            fetchData()
    }        
    }, [location])


    useEffect(() => {
        if(data.current) {
            setTemp(data.current.temp_c + " C")
        }
    },[data])

    const handleTemp = () => {
        if(!temp) {
            setTemp("?")
        }
        if(temp === data.current.temp_c + " C") {
            setTemp(data.current.temp_f + " F")
        }
        else {
            setTemp(data.current.temp_c + " C")
        }
        

    }


    return (
        <div className="container">
            {(typeof data.current !== 'undefined') ? ( 
            <div className="weather-container">
                <h4 className="place">{data.location.region}, {data.location.country}</h4>
                <div className="leftSide">
                    <h5 className="time">{data.location.localtime}</h5>
                    <span className="temperature">
                        <img alt="icon" src={data.current.condition.icon}></img>
                        <h5>{temp}°</h5>                    
                    </span>

                    <button onClick={handleTemp}>Change degrees F / C</button>
                </div>
                    

                <div className="rightSide">
                    <p className="description">{data.current.condition.text}</p>
                    <p>Wind speed: {data.current.wind_kph}km/h</p>
                    <p>Humidity: {data.current.humidity}%</p>
                    <p>Clouds: {data.current.cloud}%</p>
                </div> 

            </div>

             ) : ('')} 

        </div> 
        
    )
}



export default Info
