import React, { useEffect, useState } from 'react';
// import { ReactDOM } from 'react-dom';
import Descriptions from './components/Descriptions';
import hotImg from './assets/pink.jpg';
import coldImg from './assets/cold2.jpg';
import { getWeatherData } from './weatherData';



function App() {

  const myAPIkey = 'AIzaSyD5T8Z2H7p3TQbRQnWxeixm5_ZgQeIxuD0';

  

  const [city, setCity] = useState('Lund');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(coldImg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      //console.log(data);
      setWeather(data);

      // dynamic background
    const threshold = units === 'metric' ? 15 : 50;
    if (data.temp >= threshold) setBg(hotImg);
    else setBg(coldImg);
    };

    fetchWeatherData();
  }, [units, city])
  
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    console.log(currentUnit);

    const isCelcius = currentUnit === 'C';
    button.innerText = isCelcius ? '°F' : '°C';
    setUnits(isCelcius ? 'metric' : 'imperial');
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur()
    }
  }

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className='overlay'>

          {/* container renders only if weather is not null      */}
          {
            weather && (
                <div className='container'>
          <div className='section section__inputs'>
            <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter city here...' />
            <button onClick={(e) => handleUnitsClick(e)}> °F</button>
          </div>
          
          <div className='section section__temperature'>
            <div className='icon'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt='weatherIcon'draggable='false' />
              <h3>{weather.description}</h3>
            </div>
            <div className='temperature'>
              <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`} </h1>
            </div>
          </div>
          
          {/* bottom description */}
          <Descriptions weather={weather} units={units}  />
        </div>
            )
          }
        
      </div>

    </div>
  );
}

export default App;
