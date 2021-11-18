import './WeatherApp.css';
import axios from 'axios';
import React, {useState} from 'react';
import WeatherMain from './WeatherMain';
import rainImage from './images/rain.jpg';
import cloudImage from './images/cloudy.jpg';

function WeatherApp() {

  const apiKey = 'a26c42b0ac5962d5bbc6665ebc491ac9';
  const base = 'https://api.openweathermap.org/data/2.5/';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
     'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

     return `${day} ${date} ${month} ${year}`
}
  
        
    const getWeather = (event) => {
      if( event.key === 'Enter' ){
     axios.get(`${base}weather?q=${city}&units=imperial&cnt=7&APPID=${apiKey}`)
        .then(response => {
            console.log("AXIOS RESPONSE: ", response.data);
            setWeatherData(response.data)
            console.log(weatherData);
            setCity("");
          })
          .catch(err => {
            console.log(err);
        })}};


        let rows = [];
        let imageUrl;
        if ( typeof weatherData.weather != 'undefined' ) {
       //   if (weatherData.weather[0].main === 'Clouds') {
        //    let backgroundColor = 'red';
        //    return (
         //     <div className='container' style={{ backgroundColor: backgroundColor }}/>
        //    )
        //  }
          if (weatherData.weather[0].main === 'Clouds') { 
            console.log(weatherData.weather[0].main);
            const imageUrl = weatherData.weather[0].main === 'Clouds' ? cloudImage : rainImage;
          }                    
          
          rows = weatherData.weather.map(el => {
              return (
                   < WeatherMain description={el.description} icon={el.icon} />
              ) // return
        }) 
        }  
     
  
  console.log(weatherData.name);
  return (
    <div className="container">
      <input type="text" className="input" placeholder="Enter City" 
      onChange={e => setCity(e.target.value)} value={city} onKeyPress={getWeather} style={{backgroundImage: `url(${imageUrl})` }}/>

     {typeof weatherData.main === 'undefined' ? (
       <div className="welcome">
         <p>Welcome to weather app! Enter in a city to get the weather.</p>
       </div>
     ) : (
       <div>
         <div className='location'>{weatherData.name}</div>
         <div className='date'>{dateBuilder(new Date())}</div>
         <div className='temp'>{Math.round(weatherData.main.temp)}°F</div>
         <div className='weather'>{weatherData.weather[0].main}</div>

       {rows} 
      </div>
     )}  

    </div>
  );
}

export default WeatherApp;
