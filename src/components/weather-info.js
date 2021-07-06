import { useEffect, useState } from "react"


const Info = () => {    
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: "",
            lng: ""
        }
    })
    const [link, setLink] = useState({})
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
            
    },[location])

    const fetchData = async(changer) => {
        let url = `http://api.weatherapi.com/v1/current.json?key=8a88406f21734422b8504112210507&q=${location.coordinates.lat},${location.coordinates.lng}&aqi=no`
        const response = await fetch(url).then(data => data.json())
        setLink(response)
        }

    useEffect(() => {
        if(location.loaded === true){
            fetchData()
    }        
    })

    useEffect(() => {
        if(link.current) {
            setTemp(link.current.temp_c)
        }
    },[link])

    const convertTemp = () => {
        let changer = null
        if(changer) {
             setTemp(link.current.temp_c)
             changer = false
        }
        else {

            setTemp(link.current.temp_f)
            changer = true
        }
    }


    return (
        <div className="container">
            {(typeof link.current != 'undefined') ? ( 
            <div className="weather-container">
                <h4 className="place">{link.location.region}, {link.location.country}</h4>
                <div className="leftSide">
                    <h5 className="time">{link.location.localtime}</h5>
                    <img alt="icon" src={link.current.condition.icon}></img>
                    <h5 className="temperature">{temp}°</h5>
                    <button onClick={() => convertTemp()}>Change degrees F / C</button>
                </div>
                    

                <div className="rightSide">
                    <p className="description">{link.current.condition.text}</p>
                    <p>Wind speed: {link.current.wind_kph}km/h</p>
                    <p>Humidity: {link.current.humidity}%</p>
                    <p>Clouds: {link.current.cloud}%</p>
                </div> 

            </div>

            ) : ('')}

        </div> 
        
    )
}



export default Info
