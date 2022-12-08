import './styles/App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';  //處理cors問題

function App() {
  const [data, setData] = useState([]);
  const [vages, setVages] = useState([]); //素
  const [meats, setMeats] = useState([]);  //葷 吃肉肉

  useEffect(()=> {
    fetchData();
    let length = data.length;
    let tempVages = [];
    let tempMeats = [];
    for(let i = 0; i < length; i++) {
      data[i][1] === 'yes' ? tempVages.push(data[i][0]) : tempMeats.push(data[i][0]);
    }
    setVages(tempVages);
    setMeats(tempMeats);
  }, [])

  const fetchData = () => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        setData(res.data.values);
      }).catch((res) => {
        console.log(res)
      })
  }

  return (
    <div className="container">
      <header className="card-header text-center py-2">
        <h1>今天吃什麼</h1>
        <p>熱血開抽</p>
      </header>
      <section className="card-body d-flex flex-column justify-content-center align-items-center">
        <div className="lottery d-flex flex-column">
          <div>
            <h2>
              <span>今天吃什麼呢</span>
            </h2>
          </div>
          <h1>顯示區</h1>
          <div className="show-shop-container">
            {data.map((item, index) => {
              if(index !== 0) {
                return <h5><span>{item[0]}</span></h5>
              }
                //map need return something
            })}
          </div>
          <a href="#" className="btn-container" onClick={fetchData}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Button
          </a>
        </div>
        <div className="select">
          <button className="btn btn-primary">素食</button>
        </div>
        <div className="google-map"></div>
      </section>
      <footer className="card-footer text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
