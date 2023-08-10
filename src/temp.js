import React, { useEffect, useState } from "react";
import "./style.css";
import Weatherinfo from "./weatherinfo";

const Temp = () => {
  const [searchValue ,setSearchValue] =useState("Pune");
  const [NewInfo,setNewInfo]=useState({});

  const getWeatherInfo = async () => {
      try{

       let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=Your Api Key`
       let res = await fetch(url);
       let data= await res.json();
      
       let {temp,humidity,pressure}=data.main;
       let {main:weathermood}=data.weather[0];
       let {name}=data;
       let {speed}=data.wind;
       let {country,sunset}=data.sys;

       const MyObject={
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset
       }
      
       setNewInfo(MyObject);
      }

      catch(error){
       console.log(error);
      }
  }
 
  useEffect(()=>{
    getWeatherInfo();
  },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(event)=>setSearchValue(event.target.value)}
          />
 
          <button className="searchButton" type="button" onClick={()=>getWeatherInfo()}>
            Search
          </button>
        </div>
      </div>

      <Weatherinfo NewInfo={NewInfo} />
    </>
  );
};

export default Temp;
