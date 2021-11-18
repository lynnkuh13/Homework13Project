import React  from 'react';
import './WeatherApp.css';

function WeatherMain(props) {

    return(
        <div style={{
            color: 'white',
            fontSize: '30px',
            fontWeight: 700,
            textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
            textAlign: "center",
            justifyContent: "center",
            backgroundImage: "url('./images/rain.jpg')"}}>

            
            <ul>
                <li> {props.description}</li>
                <li> {props.icon}</li>
            </ul>
        </div>
    )
}
export default WeatherMain;