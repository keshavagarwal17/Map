import './App.css';
import { useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import dotenv from 'dotenv';

dotenv.config();

const App = () => {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 9;
  const initalCenter =[77.59,12.97];
  const cities = ["Bangalore","Mumbai","Pune","Delhi","Jaipur"]
  const centers = [[77.59,12.97],[72.88,19.08],[73.87,18.52],[77.10,28.70],[75.79,26.91]]
  const populations = ["12,764,935","20,667,656","6,807,984","31,181,376","4,067,826"];
  const [currValue,setPopulation] = useState("12,764,935")

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initalCenter,
      zoom: zoom
    });
    var Tawk_API=process.env.REACT_APP_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src=process.env.REACT_APP_SRC;
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  },[]);

  const handleChange = ()=>{
    let val = document.getElementById("city").value;
    map.current.setCenter(centers[val])
    setPopulation(populations[val]);
  }

  return (
    <div className="App">
      <div className="info">
        <div className="selection-box">
          <p>Select A City</p>
          <select id="city" onChange={handleChange}>
            {
              cities.map((city,index)=><option key={index} value={index}>{city}</option>)
            }
          </select>
        </div>
        <div className="population">
          <p>Population : {currValue}</p>
        </div>
      </div>
      <div className="map-box">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}

export default App;
