import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'

const Weather = ({capital}) => {

    const [weatherObj, setWeatherObj] = useState({})

    useEffect(() => {

        //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

        const params = {
            appid: process.env.REACT_APP_API_KEY
        }

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${params.appid}`

        axios
            .get(url)
            .then(response => {
                console.log(response.data)
                setWeatherObj(response.data)
            })

    }, [])

    if(weatherObj && Object.keys(weatherObj).length !== 0){
        const imgUrl = `https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`
        return (
            <div>
                <p>Temperature: {Math.round(weatherObj.main.temp - 273.15)} °C</p>
                <img alt="wather" src={imgUrl} />
                <p>Wind speed: {weatherObj.wind.speed} m/s</p>
            </div>
        )
    } else {
        return (<div>Loading data...</div>)
    }

}

export default Weather