// import use
import { useEffect, useState } from "react"


const Info = () => {    
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: "",
            lng: ""
        }
    })

    const useLocation = async() => {
        let url = `http://api.weatherapi.com/v1/current.json?key=8a88406f21734422b8504112210507&q=${location.coordinates.lat},${location.coordinates.lng}&aqi=no`
        const response = await fetch(url).then(data => data.json())
        console.log(response)

    }

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

    

    useEffect(() => {
        if(!navigator.geolocation) {
            alert('Your browser is not compatible with geolocation')
        }
        else {
            navigator.geolocation.getCurrentPosition(success, error)
        }

    },[location])

    return useLocation
}



export default Info
